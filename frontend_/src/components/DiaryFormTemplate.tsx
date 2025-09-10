import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MainInput } from './ui/inputs/MainInput';
import { DateTimeInput } from './ui/inputs/DateTimeInput';
import MoodOptionSection from '@/components/MoodOptionSection';
import { ActivitiesSection } from '@/components/ActivitySection';
import NotesInput from './ui/inputs/NotesInput';
import PhotoPicker from './ui/inputs/PhotoPicker';

const { width } = Dimensions.get('window');

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

  selectedMoodId: string | null;
  onSelectMood: (id: string) => void;

  selectedActivitiesIds: string[];
  onSelectActivities: (ids: string[]) => void;

  notes: string;
  onChangeNotes: (text: string) => void;

  selectedImageUri?: string;
  onImageSelected: (uri: string) => void;
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
  selectedMoodId,
  onSelectMood,
  selectedActivitiesIds,
  onSelectActivities,
  notes,
  onChangeNotes,
  selectedImageUri,
  onImageSelected,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <MainInput
        labelText="Título"
        keyboardType="default"
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Título"
      />

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateInputWrapper}>
          <DateTimeInput
            labelText="Data"
            datetime={selectedDate}
            onChange={(_: any, date?: Date) => {
              setShowDatePicker(false);
              if (date) onChangeDate(date);
            }}
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            mode="date"
          />
        </View>
        <View style={styles.timeInputWrapper}>
          <DateTimeInput
            labelText="Hora"
            datetime={selectedTime}
            onChange={(_: any, time?: Date) => {
              setShowTimePicker(false);
              if (time) onChangeTime(time);
            }}
            showPicker={showTimePicker}
            onPress={() => setShowTimePicker(true)}
            mode="time"
          />
        </View>
      </View>

      <MoodOptionSection
        //@ts-ignore
        selectedMoodId={selectedMoodId}
        handleMoodSelect={onSelectMood}
      />

      <ActivitiesSection
        title="O que você tem feito?"
        //@ts-ignore
        selected={selectedActivitiesIds}
        //@ts-ignore
        setSelected={onSelectActivities}
        multiple
      />

      <NotesInput notes={notes} onChangeNotes={onChangeNotes} />

      <PhotoPicker
        //@ts-ignore
        selectedImageUri={selectedImageUri}
        //@ts-ignore
        onImageSelected={onImageSelected}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    marginHorizontal: width * 0.05,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  dateInputWrapper: {
    flex: 1,
    marginRight: 8, // Espaço entre os inputs
  },
  timeInputWrapper: {
    flex: 1,
  },
});

export default DiaryForm;
