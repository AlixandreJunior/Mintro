import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { registerStepsLog } from '@/api/services/steps/registerSteps';
import { getStepsList } from '@/api/services/steps/listSteps';

const UPDATE_INTERVAL_MS = 25;
const MIN_STEP_INTERVAL_MS = 350;
const WARMUP_MS = 1500;
const BASELINE_ALPHA = 0.02;
const DYNAMIC_SMOOTH_ALPHA = 0.2;
const UPPER_THRESHOLD_G = 0.22;
const LOWER_THRESHOLD_G = 0.12;
const SEND_INTERVAL_MS = 1 * 60 * 1000;

export function useStepCounter() {
  const localStepsRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const baselineRef = useRef<number | null>(null);
  const dynamicRef = useRef(0);
  const armedRef = useRef(true);
  const lastSendTimeRef = useRef<number | null>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      console.warn('Accelerometer não disponível no web');
      return;
    }

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

      if (armedRef.current) {
        if (dynamicRef.current > UPPER_THRESHOLD_G) {
          if (now - lastStepTimeRef.current >= MIN_STEP_INTERVAL_MS) {
            lastStepTimeRef.current = now;
            armedRef.current = false;
            localStepsRef.current += 1;
          }
        }
      } else if (dynamicRef.current < LOWER_THRESHOLD_G) {
        armedRef.current = true;
      }

      if (
        !lastSendTimeRef.current ||
        now - lastSendTimeRef.current >= SEND_INTERVAL_MS
      ) {
        if (localStepsRef.current > 0) {
          const delta = localStepsRef.current;
          lastSendTimeRef.current = now;
          localStepsRef.current = 0;

          registerStepsLog({ steps: delta })
            .then(async () => {
              console.log('✅ Passos enviados:', delta);
              const data = await getStepsList();
              const total = data.reduce(
                (acc: number, item: any) => acc + (item.steps || 0),
                0
              );
              console.log('📊 Total atualizado no backend:', total);
            })
            .catch((err: any) =>
              console.error('❌ Erro ao enviar passos:', err.message)
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
}
