import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import FormHeader from '@/components/layout/FormHeader';
import DiaryForm from '@/components/DiaryFormTemplate';
import { useDiaryManager } from '@/hooks/useDiary';

const CreateDiaryScreen = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState<string[]>(
    []
  );
  const [notes, setNotes] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [selectedMoodId, setSelectedMoodId] = useState('Neutro');

  const { handleSave } = useDiaryManager(selectedDate);

  const onSave = () => {
    handleSave({
      title,
      notes,
      selectedDate,
      selectedTime,
      selectedMoodId,
      selectedActivitiesIds,
      selectedImageUri,
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
        selectedMoodId={selectedMoodId}
        onSelectMood={setSelectedMoodId}
        selectedActivitiesIds={selectedActivitiesIds}
        onSelectActivities={setSelectedActivitiesIds}
        notes={notes}
        onChangeNotes={setNotes}
        selectedImageUri={selectedImageUri}
        onImageSelected={setSelectedImageUri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default CreateDiaryScreen;
