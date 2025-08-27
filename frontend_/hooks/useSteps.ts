import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

const CALORIES_PER_STEP = 0.05;
const UPDATE_INTERVAL_MS = 25;
const MIN_STEP_INTERVAL_MS = 350;
const WARMUP_MS = 1500;
const BASELINE_ALPHA = 0.02;
const DYNAMIC_SMOOTH_ALPHA = 0.2;
const UPPER_THRESHOLD_G = 0.22;
const LOWER_THRESHOLD_G = 0.12;

export function useSteps() {
  const [steps, setSteps] = useState(0);
  const lastStepTimeRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const baselineRef = useRef<number | null>(null);
  const dynamicRef = useRef(0);
  const armedRef = useRef(true);
  const subscriptionRef = useRef<ReturnType<
    typeof Accelerometer.addListener
  > | null>(null);

  useEffect(() => {
    let mounted = true;

    const subscribe = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      if (!isAvailable || !mounted) {
        console.log('Accelerometer not available on this device');
        return;
      }

      Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);
      startTimeRef.current = Date.now();

      subscriptionRef.current = Accelerometer.addListener(({ x, y, z }) => {
        const mag = Math.sqrt(x * x + y * y + z * z);

        if (baselineRef.current === null) {
          baselineRef.current = mag;
          return;
        }

        baselineRef.current =
          (1 - BASELINE_ALPHA) * baselineRef.current + BASELINE_ALPHA * mag;

        const dynamic = mag - baselineRef.current;

        dynamicRef.current =
          (1 - DYNAMIC_SMOOTH_ALPHA) * dynamicRef.current +
          DYNAMIC_SMOOTH_ALPHA * dynamic;

        const now = Date.now();

        if (now - (startTimeRef.current ?? now) < WARMUP_MS) return;

        if (armedRef.current) {
          if (dynamicRef.current > UPPER_THRESHOLD_G) {
            if (now - lastStepTimeRef.current >= MIN_STEP_INTERVAL_MS) {
              lastStepTimeRef.current = now;
              armedRef.current = false;
              setSteps((prev) => prev + 1);
            }
          }
        } else {
          if (dynamicRef.current < LOWER_THRESHOLD_G) {
            armedRef.current = true;
          }
        }
      });
    };

    subscribe();

    return () => {
      mounted = false;
      subscriptionRef.current?.remove?.();
      subscriptionRef.current = null;
    };
  }, []);

  const resetSteps = () => {
    setSteps(0);
    lastStepTimeRef.current = 0;
  };

  const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

  return { steps, estimatedCaloriesBurned, resetSteps };
}
