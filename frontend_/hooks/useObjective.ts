import { useEffect, useState } from 'react';
import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives';

export function useObjective() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjectives = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getObjectiveList();
        setObjectives(data);
      } catch (err: any) {
        setError(err.message || 'Falha ao carregar objetivos.');
        console.error('Erro ao buscar objetivos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectives();
  }, []);

  return {
    objectives,
    loading,
    error,
  };
}
