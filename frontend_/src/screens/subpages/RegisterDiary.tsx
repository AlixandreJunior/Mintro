import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/layout/Header';
import FormHeader from '@/components/layout/FormHeader';
import { useDiaryForm } from '@/hooks/forms/useDiaryForm';
import DiaryForm from '@/components/DiaryFormTemplate';

const CreateDiaryScreen = () => {
  const {
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
    selectedMoodId,
    setSelectedMoodId,
    handleSave,
  } = useDiaryForm();

  return (
    <View style={styles.container}>
      <FormHeader
        title="Novo Diário"
        onBackPress={() => router.replace('/(tabs)/mental')}
        onSavePress={handleSave}
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
        //@ts-ignore
        selectedActivitiesIds={selectedActivitiesIds}
        //@ts-ignore
        onSelectActivities={setSelectedActivitiesIds}
        notes={notes}
        onChangeNotes={setNotes}
        //@ts-ignore
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
