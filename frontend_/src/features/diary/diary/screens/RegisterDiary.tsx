import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import FormHeader from '@/share/components/layout/FormHeader';
import { useDiary } from '../hooks/useDiary';
import DiaryForm from '../components/DiaryForm';
import { MoodType } from '@/share/types/mental/diary';
import { formatDatetimeToISO } from '@/share/utils/formatDatetimeToISO';
import { combineDateAndTime } from '../utils/datetime';

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

  const { handleDiaryCreate } = useDiary();

  const onSave = () => {
    const created_at = formatDatetimeToISO(
      combineDateAndTime(selectedDate, selectedTime)
    );

    handleDiaryCreate({
      title,
      content,
      created_at,
      mood,
      activities_ids,
      photo,
    });
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default CreateDiaryScreen;
