import { useState, useEffect, useMemo } from 'react';
import { getHydratationList } from '@/services/hydratation/listHydratation';
import { Hydratation } from '@/types/health/hydratation';
import { calculateHydration } from '@/utils/healthStats';

export function useHydrationLogs(date: Date) {
  const [logs, setLogs] = useState<Hydratation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { totalHydrationToday, hydrationProgressPercentage } = useMemo(() => calculateHydration(logs),[logs]);
  
  useEffect(() => {
    setLoading(true);
    getHydratationList(date)
      .then((data) => {
        setLogs(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Erro ao buscar hidratação');
      })
      .finally(() => setLoading(false));
  }, [date]);

  return { logs, loading, error, totalHydrationToday, hydrationProgressPercentage };
}
