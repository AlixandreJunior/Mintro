import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Objective } from '@/src/types/mental/objectives';
import { getObjective } from '@/src/services/objectives/getObjective';
import { updateObjective } from '@/src/services/objectives/updateObjective'; // ajuste conforme seu import real
import { useObjectiveForm } from '@/src/hooks/forms/useObjectiveForm';
import { router } from 'expo-router';

export function useObjectiveDetail(id: number | null) {
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [isReminderModalVisible, setReminderModalVisible] = useState(false);

  const {
    selectedRepeat,
    setSelectedRepeat,
    reminderTime,
    setReminderTime,
    remindersEnabled,
    setRemindersEnabled,
    // removi handleUpdate daqui para usar o local
  } = useObjectiveForm();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function parseTimeStringToDate(time: string): Date {
    const [hour, minute] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  const fetchObjective = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getObjective(id);
      setObjective(data);
      setSelectedRepeat(data.repeat);
      if (data.reminder) {
        setReminderTime(data.reminder);
        setRemindersEnabled(true);
        setSelectedDate(parseTimeStringToDate(data.reminder));
      }
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
    updatedFields: Partial<{
      period: string;
      repeat: string;
      reminder: string | null;
    }> = {}
  ) => {
    // Monta os dados finais para enviar
    const data: Partial<{
      period: string;
      repeat: string;
      reminder: string | null;
    }> = {
      ...updatedFields,
    };

    // Preenche com estados atuais se não estiverem no updatedFields
    if (!('period' in data) && objective?.period)
      data.period = objective.period;
    if (!('repeat' in data) && selectedRepeat) data.repeat = selectedRepeat;
    if (!('reminder' in data)) {
      if (remindersEnabled) {
        if (!reminderTime) {
          Alert.alert('Erro', 'Defina o horário do lembrete.');
          return false;
        }
        data.reminder = reminderTime;
      } else {
        data.reminder = null;
      }
    }

    try {
      await updateObjective(id, data);
      Alert.alert('Sucesso', 'Objetivo atualizado com sucesso!');
      // Atualiza estado local também
      setObjective((prev) => (prev ? { ...prev, ...data } : prev));
      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar objetivo:', error);
      Alert.alert('Erro', error.message || 'Erro ao atualizar objetivo.');
      return false;
    }
  };

  const onRepeatSelect = async (times: number) => {
    if (!objective || !id) return;
    const repeatStr = `${times}x`;
    //@ts-ignore
    setSelectedRepeat(repeatStr);
    setUpdating(true);
    try {
      const success = await handleUpdate(id, {
        repeat: repeatStr,
      });
      if (success) {
        setRepeatModalVisible(false);
      }
    } finally {
      setUpdating(false);
    }
  };

  const onReminderSave = async () => {
    if (!id) return;
    setUpdating(true);
    try {
      const timeString = selectedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setReminderTime(timeString);
      setRemindersEnabled(true);

      const success = await handleUpdate(id, { reminder: timeString });
      if (success) {
        setReminderModalVisible(false);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleModalChange = (
    type: 'reminder' | 'repeat',
    value: string | null
  ) => {
    if (!value) return;
    if (type === 'reminder') {
      const [hour, minute] = value.split(':').map(Number);
      const date = new Date();
      date.setHours(hour, minute);
      setSelectedDate(date);
      setReminderTime(value);
      setRemindersEnabled(true);
      onReminderSave();
    }
    if (type === 'repeat') {
      const times = parseInt(value);
      onRepeatSelect(times);
    }
  };

  const closeModals = () => {
    setRepeatModalVisible(false);
    setReminderModalVisible(false);
  };

  return {
    objective,
    loading,
    updating,
    isRepeatModalVisible,
    isReminderModalVisible,
    selectedRepeat,
    reminderTime,
    selectedDate,
    setSelectedDate,
    setRepeatModalVisible,
    setReminderModalVisible,
    onRepeatSelect,
    onReminderSave,
    handleModalChange,
    closeModals,
    fetchObjective,
  };
}
