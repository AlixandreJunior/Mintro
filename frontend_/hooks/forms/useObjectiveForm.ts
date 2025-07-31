import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { registerObjectiveLog } from '@/services/objectives/createObjective';
import { updateObjective } from '@/services/objectives/updateObjective';
import { ObjectiveWrite } from '@/types/mental/objectives';

export function useObjectiveForm() {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(
    null
  );
  const [selectedPeriod, setSelectedPeriod] = useState<
    '1w' | '2w' | '3w' | null
  >(null);
  const [selectedRepeat, setSelectedRepeat] = useState<
    '1x' | '3x' | '5x' | null
  >(null);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<string>(''); // Ex: "08:30"

  const handleSave = async () => {
    if (!selectedObjectiveId || !selectedPeriod || !selectedRepeat) {
      Alert.alert(
        'Erro',
        'Selecione objetivo, período e repetição antes de salvar.'
      );
      return;
    }

    if (remindersEnabled && !reminderTime) {
      Alert.alert('Erro', 'Defina o horário do lembrete.');
      return;
    }

    const data: ObjectiveWrite = {
      activity: parseInt(selectedObjectiveId, 10),
      period: selectedPeriod,
      repeat: selectedRepeat,
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

  const handleUpdate = async (id: number) => {
    if (!selectedPeriod && !selectedRepeat && !reminderTime) {
      Alert.alert(
        'Erro',
        'Selecione ao menos um campo para atualizar: período, repetição ou lembrete.'
      );
      return;
    }

    const data: Partial<ObjectiveWrite> = {};

    if (selectedPeriod) data.period = selectedPeriod;
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
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedPeriod,
    setSelectedPeriod,
    selectedRepeat,
    setSelectedRepeat,
    remindersEnabled,
    setRemindersEnabled,
    reminderTime,
    setReminderTime,
    handleSave,
    handleUpdate,
  };
}
