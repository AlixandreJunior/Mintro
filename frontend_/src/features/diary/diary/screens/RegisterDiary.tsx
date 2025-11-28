import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import FormHeader from '@/share/components/layout/FormHeader';
import { useDiary } from '../hooks/useDiary';
import DiaryForm from '../components/DiaryForm';
import { MoodType } from '@/share/types/mental/diary';
import {
  formatDatetimeToISO,
  formatTimeToISO,
} from '@/share/utils/formatDatetimeToISO';
import { appendImageToFormData } from '@/share/utils/appendImageToFormData';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import Toast

const CreateDiaryScreen = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activities_ids, setActivities_ids] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<string>();
  const [mood, setMood] = useState<MoodType>('Neutro');

  const { handleDiaryCreate, error } = useDiary();
  const { showToast } = useToast(); // 🔹 hook do Toast

  const onSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', formatDatetimeToISO(selectedDate));
      formData.append('time', formatTimeToISO(selectedTime));
      formData.append('mood', mood);

      activities_ids.forEach((id) =>
        formData.append('activities_ids', String(id))
      );

      await appendImageToFormData(formData, photo);

      await handleDiaryCreate(formData);

      // 🔹 exibe toast de sucesso
      showToast('Diário criado com sucesso!', 'success');

      // redireciona após 1.5s para o usuário perceber o toast
      setTimeout(() => {
        router.push('/(app)/(tabs)/mental');
      }, 1500);
    } catch (err) {
      showToast('Erro ao criar diário!', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader
        title="Novo Diário"
        onBackPress={() => router.replace('/(app)/(tabs)/mental')}
        onSavePress={onSave}
      />

      <DiaryForm
        title={title}
        onChangeTitle={setTitle}
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedTime={selectedTime}
        onChangeTime={setSelectedTime}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        mood={mood}
        onSelectMood={setMood}
        activities={activities_ids}
        onSelectActivities={setActivities_ids}
        content={content}
        onChangeContent={setContent}
        photo={photo}
        onImageSelected={setPhoto}
        errors={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default CreateDiaryScreen;
