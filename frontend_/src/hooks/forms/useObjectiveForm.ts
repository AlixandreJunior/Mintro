import { Alert } from 'react-native';
import { router } from 'expo-router';
import { registerObjectiveLog } from '@/services/objectives/createObjective';
import { updateObjective } from '@/services/objectives/updateObjective';
import { ObjectiveWrite } from '@/types/mental/objectives';

export function useObjectiveForm() {
  const validateSave = (
    selectedObjectiveId: string | null,
    selectedRepeat: '1x' | '3x' | '5x' | null,
    remindersEnabled: boolean,
    reminderTime: string
  ) => {
    if (!selectedObjectiveId || !selectedRepeat) {
      Alert.alert(
        'Erro',
        'Selecione objetivo, período e repetição antes de salvar.'
      );
      return false;
    }
    if (remindersEnabled && !reminderTime) {
      Alert.alert('Erro', 'Defina o horário do lembrete.');
      return false;
    }
    return true;
  };

  const handleSave = async ({
    selectedObjectiveId,
    selectedRepeat,
    remindersEnabled,
    reminderTime,
  }: {
    selectedObjectiveId: string | null;
    selectedRepeat: '1x' | '3x' | '5x' | null;
    remindersEnabled: boolean;
    reminderTime: string;
  }) => {
    if (
      !validateSave(
        selectedObjectiveId,
        selectedRepeat,
        remindersEnabled,
        reminderTime
      )
    )
      return;

    const data: ObjectiveWrite = {
      activity: parseInt(selectedObjectiveId!, 10),
      repeat: selectedRepeat!,
      reminder: remindersEnabled ? reminderTime : null,
    };

    try {
      await registerObjectiveLog(data);
      Alert.alert('Sucesso', 'Objetivo registrado com sucesso!');
      router.back();
    } catch (error: any) {
      console.error('Erro ao registrar objetivo:', error);
      Alert.alert('Erro', error.message || 'Erro ao registrar objetivo.');
    }
  };

  const handleUpdate = async (
    id: number,
    {
      selectedPeriod,
      selectedRepeat,
      remindersEnabled,
      reminderTime,
    }: {
      selectedPeriod: '1w' | '2w' | '3w' | null;
      selectedRepeat: '1x' | '3x' | '5x' | null;
      remindersEnabled: boolean;
      reminderTime: string;
    }
  ) => {
    if (!selectedPeriod && !selectedRepeat && !reminderTime) {
      Alert.alert(
        'Erro',
        'Selecione ao menos um campo para atualizar: período, repetição ou lembrete.'
      );
      return;
    }

    const data: Partial<ObjectiveWrite> = {};
    if (selectedRepeat) data.repeat = selectedRepeat;
    if (remindersEnabled) {
      if (!reminderTime) {
        Alert.alert('Erro', 'Defina o horário do lembrete.');
        return;
      }
      data.reminder = reminderTime;
    } else {
      data.reminder = null;
    }

    try {
      await updateObjective(id, data);
      Alert.alert('Sucesso', 'Objetivo atualizado com sucesso!');
      router.back();
    } catch (error: any) {
      console.error('Erro ao atualizar objetivo:', error);
      Alert.alert('Erro', error.message || 'Erro ao atualizar objetivo.');
    }
  };

  return {
    handleSave,
    handleUpdate,
  };
}
