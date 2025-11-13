import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FormHeader from '@/share/components/layout/FormHeader';
import DiaryForm from '@/share/components/DiaryFormTemplate';
import { Diary } from '@/share/types/mental/diary';
import { useDiaryManager } from '@/share/hooks/useDiary';

const UpdateDiaryScreen = () => {
  const { id } = useLocalSearchParams();

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

  const { loadDiaryById, handleUpdate } = useDiaryManager(selectedDate);

  useEffect(() => {
    const fetchDiary = async () => {
      if (id) {
        const diary: Partial<Diary> | null = await loadDiaryById(Number(id));
        if (!diary) return;

        if (diary.title) setTitle(diary.title);
        if (diary.datetime) {
          const dt = new Date(diary.datetime);
          setSelectedDate(dt);
          setSelectedTime(dt);
        }
        if (diary.content) setNotes(diary.content);
        if (diary.mood) setSelectedMoodId(diary.mood);
        if (diary.photo) setSelectedImageUri(diary.photo);
        if (diary.activities)
          setSelectedActivitiesIds(
            Array.isArray(diary.activities)
              ? diary.activities.map((a: any) =>
                  typeof a === 'number' ? a.toString() : a.id.toString()
                )
              : []
          );
      }
    };

    fetchDiary();
  }, [id]);

  const onSave = () => {
    if (id) {
      handleUpdate(Number(id), {
        title,
        notes,
        selectedDate,
        selectedTime,
        selectedMoodId,
        selectedActivitiesIds,
        selectedImageUri,
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

export default UpdateDiaryScreen;
