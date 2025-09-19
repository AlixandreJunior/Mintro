import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Objective } from '@/types/mental/objectives';
import { getObjective } from '@/services/objectives/getObjective';
import { updateObjective } from '@/services/objectives/updateObjective';

export function useObjectiveDetail(id: number | null) {
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchObjective = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getObjective(id);
      setObjective(data);
    } catch (error) {
      console.error('Erro ao buscar objetivo:', error);
      setObjective(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjective();
  }, [id]);

  const handleUpdate = async (
    id: number,
    updatedFields: Partial<Pick<Objective, 'period' | 'repeat' | 'reminder'>>
  ) => {
    setUpdating(true);
    try {
      await updateObjective(id, updatedFields);
      Alert.alert('Sucesso', 'Objetivo atualizado com sucesso!');
      setObjective((prev) => (prev ? { ...prev, ...updatedFields } : prev));
      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar objetivo:', error);
      Alert.alert('Erro', error.message || 'Erro ao atualizar objetivo.');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    objective,
    loading,
    updating,
    fetchObjective,
    handleUpdate,
  };
}
