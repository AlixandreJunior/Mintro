import { useCallback, useState } from 'react';

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
        setLogs(Array.isArray(data) ? [...data] : []);
      } catch (err: any) {
        const status =
          err?.response?.status ?? err?.status ?? err?.code ?? null;

        if (status === 404) {
          setLogs([]);
          return;
        }

        setLogs([]);
      }
    },
    [type, hook]
  );

  return { logs, setLogs, loadLogs };
}
