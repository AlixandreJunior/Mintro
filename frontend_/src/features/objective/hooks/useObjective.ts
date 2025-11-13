import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { Objective, ObjectiveWrite } from '@/share/types/mental/objectives';
import { getObjectiveList } from '@/api/services/objectives/listObjectives';
import { getObjective } from '@/api/services/objectives/getObjective';
import { deleteObjective } from '@/api/services/objectives/deleteObjective';
import { registerObjectiveLog } from '@/api/services/objectives/createObjective';
import { updateObjective } from '@/api/services/objectives/updateObjective';

type SaveParams = {
  selectedObjectiveId: string | null;
  selectedRepeat: '1x' | '3x' | '5x' | null;
  remindersEnabled: boolean;
  reminderTime: string;
};

type UpdateParams = {
  selectedPeriod?: '1w' | '2w' | '3w';
  selectedRepeat?: '1x' | '3x' | '5x';
  remindersEnabled: boolean;
  reminderTime?: string;
};

export function useObjectiveManager(selectedId: number | null = null) {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [objective, setObjective] = useState<Objective | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // --- LISTAGEM ---
  const refreshObjectives = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getObjectiveList();
      setObjectives(data);
    } catch (err: any) {
      console.error('Erro ao buscar objetivos:', err);
      setError(err.message || 'Falha ao carregar objetivos.');
    } finally {
      setLoading(false);
    }
  };

  // --- DETALHE ---
  const fetchObjective = async (id?: number) => {
    if (!id && !selectedId) return;
    const objId = id ?? selectedId!;
    setDetailLoading(true);
    try {
      const data = await getObjective(objId);
      setObjective(data);
    } catch (err) {
      console.error('Erro ao buscar objetivo:', err);
      setObjective(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // --- OBTER POR ID ---
  const getObjectiveById = async (id: number) => {
    try {
      return await getObjective(id);
    } catch (err: any) {
      console.error('Erro ao buscar objetivo por ID:', err);
      throw err;
    }
  };

  // --- DELETE ---
  const deleteById = async (id: number) => {
    try {
      await deleteObjective(id);
      Alert.alert('Sucesso', 'Objetivo deletado com sucesso!');
      router.replace('/(app)/(tabs)/mental');
      refreshObjectives();
    } catch (err: any) {
      console.error('Erro ao deletar objetivo:', err);
      Alert.alert(
        'Erro',
        err.message || 'Erro ao deletar objetivo. Tente novamente.'
      );
    }
  };

  // --- SALVAR ---
  const validateSave = (params: SaveParams) => {
    if (!params.selectedObjectiveId || !params.selectedRepeat) {
      Alert.alert(
        'Erro',
        'Selecione objetivo, período e repetição antes de salvar.'
      );
      return false;
    }
    if (params.remindersEnabled && !params.reminderTime) {
      Alert.alert('Erro', 'Defina o horário do lembrete.');
      return false;
    }
    return true;
  };

  const saveObjective = async (params: SaveParams) => {
    if (!validateSave(params)) return;

    const data: ObjectiveWrite = {
      activity: parseInt(params.selectedObjectiveId!, 10),
      repeat: params.selectedRepeat!,
      reminder: params.remindersEnabled ? params.reminderTime : null,
    };

    try {
      await registerObjectiveLog(data);
      Alert.alert('Sucesso', 'Objetivo registrado com sucesso!');
      router.back();
      refreshObjectives();
    } catch (err: any) {
      console.error('Erro ao registrar objetivo:', err);
      Alert.alert('Erro', err.message || 'Erro ao registrar objetivo.');
    }
  };

  // --- ATUALIZAR ---
  const updateObjectiveById = async (id: number, params: UpdateParams) => {
    if (
      !params.selectedPeriod &&
      !params.selectedRepeat &&
      !params.reminderTime &&
      !params.remindersEnabled
    ) {
      Alert.alert(
        'Erro',
        'Selecione ao menos um campo para atualizar: período, repetição ou lembrete.'
      );
      return;
    }

    const data: Partial<ObjectiveWrite> = {};
    if (params.selectedRepeat) data.repeat = params.selectedRepeat;
    if (params.remindersEnabled) {
      if (!params.reminderTime) {
        Alert.alert('Erro', 'Defina o horário do lembrete.');
        return;
      }
      data.reminder = params.reminderTime;
    } else {
      data.reminder = null;
    }

    setUpdating(true);
    try {
      await updateObjective(id, data);
      Alert.alert('Sucesso', 'Objetivo atualizado com sucesso!');
      //@ts-ignore
      setObjective((prev) => (prev ? { ...prev, ...data } : prev));
      router.back();
      refreshObjectives();
    } catch (err: any) {
      console.error('Erro ao atualizar objetivo:', err);
      Alert.alert('Erro', err.message || 'Erro ao atualizar objetivo.');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    refreshObjectives();
    if (selectedId) fetchObjective(selectedId);
  }, [selectedId]);

  return {
    objectives,
    loading,
    error,
    refreshObjectives,
    getObjectiveById,
    deleteById,

    objective,
    detailLoading,
    updating,
    fetchObjective,

    saveObjective,
    updateObjectiveById,
  };
}
