import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { registerStepsLog } from '@/services/steps/registerSteps';

const CALORIES_PER_STEP = 0.05;
const UPDATE_INTERVAL_MS = 25;
const MIN_STEP_INTERVAL_MS = 350;
const WARMUP_MS = 1500;
const BASELINE_ALPHA = 0.02;
const DYNAMIC_SMOOTH_ALPHA = 0.2;
const UPPER_THRESHOLD_G = 0.22;
const LOWER_THRESHOLD_G = 0.12;
const SEND_INTERVAL_MS = 1 * 60 * 1000; // envia a cada 5 minut

export function useSteps() {
  const [steps, setSteps] = useState(0);

  const stepsRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const lastSentStepsRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const baselineRef = useRef<number | null>(null);
  const dynamicRef = useRef(0);
  const armedRef = useRef(true);
  const lastSendTimeRef = useRef<number | null>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

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

      // Contagem de passos
      if (armedRef.current) {
        if (dynamicRef.current > UPPER_THRESHOLD_G) {
          if (now - lastStepTimeRef.current >= MIN_STEP_INTERVAL_MS) {
            lastStepTimeRef.current = now;
            armedRef.current = false;
            stepsRef.current += 1;
            setSteps(stepsRef.current);
          }
        }
      } else if (dynamicRef.current < LOWER_THRESHOLD_G) {
        armedRef.current = true;
      }

      // Envio periódico de passos
      if (
        !lastSendTimeRef.current ||
        now - lastSendTimeRef.current >= SEND_INTERVAL_MS
      ) {
        if (stepsRef.current > lastSentStepsRef.current) {
          const delta = stepsRef.current - lastSentStepsRef.current;
          lastSentStepsRef.current = stepsRef.current;
          lastSendTimeRef.current = now;

          registerStepsLog({ steps: delta })
            .then(() => console.log('Passos enviados:', delta))
            .catch((err: any) =>
              console.error('Erro ao enviar passos:', err.message)
            );
        }
      }
    });

    startTimeRef.current = Date.now();

    return () => {
      subscriptionRef.current?.remove?.();
      subscriptionRef.current = null;
    };
  }, []);

  const resetSteps = () => {
    setSteps(0);
    stepsRef.current = 0;
    lastStepTimeRef.current = 0;
    lastSentStepsRef.current = 0;
    lastSendTimeRef.current = null;
  };

  const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

  return { steps, estimatedCaloriesBurned, resetSteps };
}
