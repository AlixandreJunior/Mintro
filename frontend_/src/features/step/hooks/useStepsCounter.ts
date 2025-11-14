// hooks/useStepCounter.ts
import { useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { UPDATE_INTERVAL_MS } from '../utils/constants';
import { handleMovement } from '../utils/detection';
import { useSteps } from './useSteps';

export function useStepCounter() {
  const { handleStepsCreate } = useSteps();

  const refs = {
    localStepsRef: useRef(0),
    lastStepTimeRef: useRef(0),
    armedRef: useRef(true),
    baselineRef: useRef<number | null>(null),
    dynamicRef: useRef(0),
    startTimeRef: useRef<number | null>(null),
    lastSendTimeRef: useRef<number | null>(null),
    subscriptionRef: useRef<any>(null),
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      console.warn('Acelerômetro indisponível');
      return;
    }

    try {
      Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

      refs.subscriptionRef.current = Accelerometer.addListener((data) => {
        handleMovement(data.x, data.y, data.z, handleStepsCreate, refs);
      });
    } catch (err: any) {
      Alert.alert('Erro ao iniciar acelerômetro', err?.message ?? String(err));
    }

    refs.startTimeRef.current = Date.now();

    return () => {
      refs.subscriptionRef.current?.remove?.();
      refs.subscriptionRef.current = null;
    };
  }, []);

  return {};
}
