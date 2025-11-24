import { useCallback, useEffect, useState } from 'react';

export function useActivityLogs(type: 'exercise' | 'mindfulness', hook: any) {
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = useCallback(
    async (date: Date, period: 'week' | 'month') => {
      try {
        const handler =
          type === 'exercise'
            ? hook.handleExerciseLogList
            : hook.handleMindfulnessLogList;

        const data = await handler(date, period);

        const normalizedLogs = Array.isArray(data) ? [...data] : [];

        setLogs(normalizedLogs);
      } catch (err) {
        console.error(err);

        setLogs([]);
      }
    },
    [type, hook]
  );

  return { logs, setLogs, loadLogs };
}
