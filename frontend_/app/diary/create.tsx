import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import NotesInput from '@/components/Inputs/NotesInput';
import PhotoPicker from '@/components/Inputs/PhotoPicker';
import FormHeader from '@/components/Layout/FormHeader';
import Header from '@/components/Layout/Header';
import { MainInput } from '@/components/Inputs/MainInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import MoodOptionSection from '@/components/MoodOptionSection';
import { ActivitiesSection } from '@/components/ActivitySection';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { useDiaryForm } from '@/hooks/forms/useDiaryForm';

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
    setSelectedMoodId,
    handleSave,
  } = useDiaryForm();

  const renderDateTimeInputs = () => (
    <View style={styles.dateTimeContainer}>
      <DateTimeInput
        labelText='Data'
        datetime={selectedDate}
        onChange={(_: any, date?: Date) => {
          setShowDatePicker(false);
          if (date) setSelectedDate(date);
        }}
        showPicker={showDatePicker}
        onPress={() => setShowDatePicker(true)}
        mode='date'
      />
      <DateTimeInput
        labelText='Hora'
        datetime={selectedTime}
        onChange={(_: any, time?: Date) => {
          setShowTimePicker(false);
          if (time) setSelectedTime(time);
        }}
        showPicker={showTimePicker}
        onPress={() => setShowTimePicker(true)}
        mode='time'
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Novo Diário" onBackPress={() => router.replace('/(tabs)/mental')} onSavePress={handleSave} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MainInput
          labelText='Titulo'
          keyboardType='default'
          value={title}
          onChangeText={setTitle}
          placeholder='Título'
        />
        {renderDateTimeInputs()}
        <MoodOptionSection handleMoodSelect={setSelectedMoodId} />
        <ActivitiesSection
          title="O que você tem feito?"
          selected={selectedActivitiesIds}
          //@ts-ignore
          setSelected={setSelectedActivitiesIds}
          multiple
        />
        <ObjectiveSection />
        <NotesInput notes={notes} onChangeNotes={setNotes} />
        <PhotoPicker selectedImageUri={selectedImageUri} onImageSelected={setSelectedImageUri} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollViewContent: { paddingBottom: 20, paddingHorizontal: 12,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center', },

  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CreateDiaryScreen;
