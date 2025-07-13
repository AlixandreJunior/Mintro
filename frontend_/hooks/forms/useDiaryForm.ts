import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { createDiary } from '@/services/diary/createDiary';
import { appendImageToFormData } from '@/utils/appendImageToFormData';

export function useDiaryForm() {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMoodId, setSelectedMoodId] = useState('Neutro');

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
        formData.append('activity[]', id.toString())
      );
      await appendImageToFormData(formData, selectedImageUri);
      await createDiary(formData);

      Alert.alert('Sucesso', 'Diário criado com sucesso!');
      router.replace('/(tabs)/mental');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar diário. Tente novamente.');
      console.error('Erro ao criar diário:', error);
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
  };
}
