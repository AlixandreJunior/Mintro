import { useState, useEffect } from 'react';
import { MindfulnessLog } from '@/src/types/health/mindfulness';
import { getMindfulnessList } from '@/src/services/mindfulness/listMindfulnessLog';

type Period = 'week' | 'month';

export function useMindfulnessLogs(date: Date, period: Period) {
  const [logs, setLogs] = useState<MindfulnessLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMindfulnessList(date, period)
      .then(setLogs)
      .catch((err) => console.error('Erro mindfulness:', err))
      .finally(() => setLoading(false));
  }, [date, period]);

  return { logs, loading };
}
