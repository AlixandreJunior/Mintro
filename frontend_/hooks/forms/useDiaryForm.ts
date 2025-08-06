import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { createDiary } from '@/services/diary/createDiary';
import { appendImageToFormData } from '@/utils/appendImageToFormData';
import { Diary } from '@/types/mental/diary';
import { getDiary } from '@/services/diary/getDiary';
import { updateDiary } from '@/services/diary/updateDiary';
import { deleteDiary } from '@/services/diary/deleteDiary';

export function useDiaryForm() {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<number[]>(
    []
  );
  const [notes, setNotes] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMoodId, setSelectedMoodId] = useState('Neutro');

  async function loadDiaryById(id: number) {
    try {
      const diary: Diary = await getDiary(id);

      setTitle(diary.title);
      setNotes(diary.content);
      setSelectedMoodId(diary.mood);

      if (Array.isArray(diary.activities)) {
        const activityIds = diary.activities.map((act: any) =>
          typeof act === 'number' ? act : act.id
        );
        setSelectedActivitiesIds(activityIds);
      } else {
        setSelectedActivitiesIds([]);
      }

      if (diary.datetime) {
        const dateTime = new Date(diary.datetime);
        setSelectedDate(dateTime);
        setSelectedTime(dateTime);
      }

      if (diary.photo) {
        setSelectedImageUri(diary.photo);
      } else {
        setSelectedImageUri(null);
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao carregar diário');
      console.error('Erro ao carregar diário:', error);
    }
  }

  const getCombinedDateTime = () =>
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', notes);
      formData.append('datetime', getCombinedDateTime().toISOString());
      formData.append('mood', selectedMoodId);
      selectedActivitiesIds.forEach((id) =>
        formData.append('activity', id.toString())
      );
      await appendImageToFormData(formData, selectedImageUri);
      await createDiary(formData);

      Alert.alert('Sucesso', 'Diário criado com sucesso!');
      router.replace('/(tabs)/mental');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro ao criar diário. Tente novamente.'
      );
      console.error('Erro ao criar diário:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsSaving(true);

    try {
      await deleteDiary(id);

      Alert.alert('Sucesso', 'Diário atualizado com sucesso!');
      router.replace('/(tabs)/mental');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro ao atualizar diário. Tente novamente.'
      );
      console.error('Erro ao atualizar diário:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', notes);
      formData.append('datetime', getCombinedDateTime().toISOString());
      formData.append('mood', selectedMoodId);
      selectedActivitiesIds.forEach((id) =>
        formData.append('activity', id.toString())
      );
      await appendImageToFormData(formData, selectedImageUri);

      // Aqui usa updateDiary que espera Partial<Diary>, mas você está enviando FormData,
      // então precisa ajustar updateDiary para aceitar FormData ou usar api.patch direto aqui:
      // Supondo que updateDiary aceite FormData:
      await updateDiary(id, formData);

      Alert.alert('Sucesso', 'Diário atualizado com sucesso!');
      router.replace('/(tabs)/mental');
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Erro ao atualizar diário. Tente novamente.'
      );
      console.error('Erro ao atualizar diário:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    title,
    setTitle,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    selectedActivitiesIds,
    setSelectedActivitiesIds,
    notes,
    setNotes,
    selectedImageUri,
    setSelectedImageUri,
    isSaving,
    selectedMoodId,
    setSelectedMoodId,
    handleSave,
    handleUpdate,
    handleDelete,
    loadDiaryById,
  };
}
