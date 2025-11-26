import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FormHeader from '@/share/components/layout/FormHeader';
import DiaryForm from '../components/DiaryForm';
import { useDiary } from '../hooks/useDiary';
import { formatDatetimeToISO } from '@/share/utils/formatDatetimeToISO';
import {
  combineDateAndTime,
  extractDate,
  extractTime,
  extractTimeAsDate,
} from '../utils/datetime';
import { MoodType } from '@/share/types/mental/diary';

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

  const { handleDiaryRetrieve, handleDiaryUpdate } = useDiary();

  useEffect(() => {
    const fetchData = async () => {
      const diary = await handleDiaryRetrieve(Number(id));

      setTitle(diary.title);
      setContent(diary.content);
      setSelectedDate(extractDate(diary.created_at));
      setSelectedTime(extractTimeAsDate(diary.created_at));
      setMood(diary.mood);
      setActivities(diary.activities.map((value) => value.id));
      setPhoto(diary.photo);
    };

    fetchData();
  }, [id]);

  const onSave = () => {
    const created_at = formatDatetimeToISO(
      combineDateAndTime(selectedDate, selectedTime)
    );

    if (id) {
      handleDiaryUpdate(Number(id), {
        title,
        content,
        created_at,
        mood,
        activities,
        photo,
      });
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default UpdateDiaryScreen;
