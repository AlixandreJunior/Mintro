import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FormHeader from '@/share/components/layout/FormHeader';
import DiaryForm from '../components/DiaryForm';
import { useDiary } from '../hooks/useDiary';
import { formatDatetimeToISO } from '@/share/utils/formatDatetimeToISO';
import { MoodType } from '@/share/types/mental/diary';
import { appendImageToFormData } from '@/share/utils/appendImageToFormData';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import Toast

const parseBackendTimeToDate = (timeString: string): Date => {
  if (!timeString) return new Date();
  const [clean] = timeString.split('.');
  const [h, m, s] = clean.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, s ?? 0, 0);
  return d;
};

const formatTimeToISO = (date: Date): string => {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};

const UpdateDiaryScreen = () => {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState<string>();
  const [mood, setMood] = useState<MoodType>('Neutro');

  const { handleDiaryRetrieve, handleDiaryUpdate, error } = useDiary();
  const { showToast } = useToast(); // 🔹 hook do Toast

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const diary = await handleDiaryRetrieve(Number(id));

        setTitle(diary.title);
        setContent(diary.content);
        setSelectedDate(new Date(diary.date));
        setSelectedTime(parseBackendTimeToDate(diary.time));
        setMood(diary.mood);
        setActivities(diary.activities.map((a) => a.id));
        setPhoto(diary.photo);
      } catch (err) {
        console.error('Erro ao carregar diário:', err);
        showToast('Não foi possível carregar o diário.', 'error'); // 🔹 toast de erro
      }
    };

    fetchDiary();
  }, [id]);

  const onSave = async () => {
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', formatDatetimeToISO(selectedDate));
      formData.append('time', formatTimeToISO(selectedTime));
      formData.append('mood', mood);

      activities.forEach((id) => formData.append('activities_ids', String(id)));

      await appendImageToFormData(formData, photo);

      await handleDiaryUpdate(Number(id), formData);

      showToast('Diário atualizado com sucesso!', 'success'); // 🔹 toast de sucesso

      setTimeout(() => {
        router.push('/(app)/(tabs)/mental');
      }, 1500);
    } catch (err) {
      console.error('Erro ao atualizar diário:', err);
      showToast('Erro ao atualizar diário!', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader
        title="Editar Diário"
        onBackPress={() => router.back()}
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
        activities={activities}
        onSelectActivities={setActivities}
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

export default UpdateDiaryScreen;
