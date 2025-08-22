import { useState, useEffect } from "react";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";

const CALORIES_PER_STEP = 0.05;

export const useSteps = () => {
  const [steps, setSteps] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [lastY, setLastY] = useState<number>(0);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);

  useEffect(() => {
    let subscription:any;

    const subscribe = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      if (!isAvailable) {
        console.log("Accelerometer not available on this device");
        return;
      }

      subscription = Accelerometer.addListener((data: AccelerometerMeasurement) => {
        const { y } = data;
        const threshold = 0.1;
        const timestamp = Date.now();

        if (
          Math.abs(y - lastY) > threshold &&
          !isCounting &&
          timestamp - lastTimestamp > 800
        ) {
          setIsCounting(true);
          setLastY(y);
          setLastTimestamp(timestamp);
          setSteps((prev) => prev + 1);

          setTimeout(() => {
            setIsCounting(false);
          }, 1200);
        }
      });
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastTimestamp]);

  const resetSteps = () => {
    setSteps(0);
  };

  const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

  return {
    steps,
    estimatedCaloriesBurned,
    resetSteps,
  };
};
