import { useEffect, useState } from 'react';
import { Objective } from '@/types/mental/objectives';
import { getObjectiveList } from '@/services/objectives/listObjectives';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { deleteObjective } from '@/services/objectives/deleteObjective';
import { getObjective } from '@/services/objectives/getObjective';

export function useObjective() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetObjective = async (id: number) => {
    try {
      const data = await getObjective(id);
      return data;
    } catch (err: any) {
      console.error('Erro ao buscar objetivo por ID:', err);
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteObjective(id);

      Alert.alert('Sucesso', 'Diário atualizado com sucesso!');
      router.replace('/(tabs)/mental');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro ao atualizar diário. Tente novamente.'
      );
      console.error('Erro ao atualizar diário:', error);
    }
  };

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
    handleDelete,
    handleGetObjective,
  };
}
