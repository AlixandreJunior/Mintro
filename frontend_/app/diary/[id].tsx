import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { useDiaryForm } from '@/hooks/forms/useDiaryForm';
import DiaryForm from '@/components/DiaryFormTemplate';

const UpdateDiaryScreen = () => {
  const { id } = useLocalSearchParams();

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
    loadDiaryById,
    handleUpdate,
  } = useDiaryForm();

  useEffect(() => {
    if (id) {
      loadDiaryById(Number(id));
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader
        title="Editar Diário"
        onBackPress={() => router.back()}
        onSavePress={() => handleUpdate(Number(id))}
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

export default UpdateDiaryScreen;
