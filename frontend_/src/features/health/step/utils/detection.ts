// utils/detection.ts
import {
  BASELINE_ALPHA,
  DYNAMIC_SMOOTH_ALPHA,
  LOWER_THRESHOLD_G,
  MIN_STEP_INTERVAL_MS,
  SEND_INTERVAL_MS,
  UPPER_THRESHOLD_G,
  WARMUP_MS,
} from './constants';
import { magnitude, smooth } from './vector';

export const handleMovement = (
  x: number,
  y: number,
  z: number,
  fn: Function,
  refs: any
) => {
  const now = Date.now();
  const mag = magnitude(x, y, z);

  const { baselineRef, dynamicRef, startTimeRef } = refs;

  if (baselineRef.current === null) {
    baselineRef.current = mag;
    return;
  }

  baselineRef.current = smooth(baselineRef.current, mag, BASELINE_ALPHA);

  const diff = mag - baselineRef.current;

  dynamicRef.current = smooth(dynamicRef.current, diff, DYNAMIC_SMOOTH_ALPHA);

  if (now - (startTimeRef.current ?? now) < WARMUP_MS) return;

  if (detectStep(diff, now, refs)) {
    processStepDetected(refs);
  }

  sendStepsIfNeeded(now, fn, refs);
};

export const detectStep = (diff: number, now: number, refs: any) => {
  const { armedRef, lastStepTimeRef } = refs;

  const canStep = now - lastStepTimeRef.current >= MIN_STEP_INTERVAL_MS;

  if (armedRef.current) {
    if (diff > UPPER_THRESHOLD_G && canStep) {
      lastStepTimeRef.current = now;
      armedRef.current = false;
      return true;
    }
  } else if (diff < LOWER_THRESHOLD_G) {
    armedRef.current = true;
  }

  return false;
};

export const shouldSendSteps = (now: number, refs: any) => {
  const { lastSendTimeRef } = refs;

  return (
    !lastSendTimeRef.current ||
    now - lastSendTimeRef.current >= SEND_INTERVAL_MS
  );
};

export const processStepDetected = (refs: any) => {
  refs.localStepsRef.current += 1;
};

export const sendStepsIfNeeded = (now: number, fn: Function, refs: any) => {
  const { localStepsRef, lastSendTimeRef } = refs;

  if (!shouldSendSteps(now, refs)) return;
  if (localStepsRef.current <= 0) return;

  const steps = localStepsRef.current;
  localStepsRef.current = 0;
  lastSendTimeRef.current = now;

  fn(steps);
};
