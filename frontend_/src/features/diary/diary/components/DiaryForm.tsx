import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import MoodOptionSection from '@/share/components/MoodOptionSection';
import { ActivitiesSection } from '@/share/components/ActivitySection';
import NotesInput from '@/share/components/ui/inputs/NotesInput';
import PhotoPicker from '@/share/components/ui/inputs/PhotoPicker';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import { DiaryDateTimeRow } from './DiaryDateTimeRow';
import { MoodType } from '@/share/types/mental/diary';

interface DiaryFormProps {
  title: string;
  onChangeTitle: (text: string) => void;

  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;

  selectedTime: Date;
  onChangeTime: (time: Date) => void;
  showTimePicker: boolean;
  setShowTimePicker: (show: boolean) => void;

  mood: MoodType;
  onSelectMood: React.Dispatch<React.SetStateAction<MoodType>>;

  activities: string[];
  onSelectActivities: Dispatch<SetStateAction<string[]>>;

  content: string;
  onChangeContent: (text: string) => void;

  photo?: string | null;
  onImageSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DiaryForm: React.FC<DiaryFormProps> = ({
  title,
  onChangeTitle,

  selectedDate,
  onChangeDate,
  showDatePicker,
  setShowDatePicker,

  selectedTime,
  onChangeTime,
  showTimePicker,
  setShowTimePicker,

  mood,
  onSelectMood,

  activities,
  onSelectActivities,

  content,
  onChangeContent,

  photo,
  onImageSelected,
}) => {
  const screen = useWindowDimensions();

  const styles = useMemo(() => createStyles(screen.width), []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <MainInput
        labelText="Título"
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Título"
      />

      <DiaryDateTimeRow
        selectedDate={selectedDate}
        onChangeDate={onChangeDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        selectedTime={selectedTime}
        onChangeTime={onChangeTime}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
      />

      <MoodOptionSection
        selectedMoodId={mood}
        handleMoodSelect={onSelectMood}
      />

      <ActivitiesSection
        title="O que você tem feito?"
        selected={activities}
        setSelected={onSelectActivities}
        multiple
      />

      <NotesInput notes={content} onChangeNotes={onChangeContent} />

      <PhotoPicker selectedImageUri={photo} onImageSelected={onImageSelected} />
    </ScrollView>
  );
};

const createStyles = (width: number) =>
  StyleSheet.create({
    scrollViewContent: {
      marginHorizontal: width * 0.05,
    },
  });

export default DiaryForm;
