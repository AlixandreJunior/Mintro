import { useState, useEffect } from "react";
import { MindfulnessLog } from '@/types/health/mindfulness';
import { getMindfulnessList } from '@/services/mindfulness/listMindfulnessLog';

export function useMindfulnessLogs(date: Date) {
  const [logs, setLogs] = useState<MindfulnessLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMindfulnessList(date)
      .then(setLogs)
      .catch(err => console.error('Erro mindfulness:', err))
      .finally(() => setLoading(false));
  }, [date]);

  return { logs, loading };
}
