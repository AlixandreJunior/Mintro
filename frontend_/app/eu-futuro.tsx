import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import MoodOptionSection from '@/components/MoodOptionSection';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { MainInput } from '@/components/Inputs/MainInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import NotesInput from '@/components/Inputs/NotesInput';
import SelectInput from '@/components/Inputs/SelectInput';

const { width, height } = Dimensions.get('window');

export default function LetterToFuturePage(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [annotation, setAnnotation] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('1 Mês');
  const [selectedMoodId, setSelectedMoodId] = useState('Neutro');

  const onDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const onTimeChange = (event: any, time?: Date) => {
    const currentTime = time || selectedTime;
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(currentTime);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar='A' />
      <FormHeader title='Carta para o eu Futuro' onSavePress={() => console.log()} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MainInput
          labelText='Titulo'
          keyboardType='default'
          onChangeText={setTitle}
          value={title}
          placeholder='Titulo'
        />

        <View style={styles.dateTimeContainer}>
          <DateTimeInput
            labelText='Data'
            datetime={selectedDate}
            onChange={onDateChange}
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            mode='date'
          />
          <DateTimeInput
            labelText='Hora'
            datetime={selectedTime}
            onChange={onTimeChange}
            showPicker={showTimePicker}
            onPress={() => setShowTimePicker(true)}
            mode='time'
          />
        </View>

        <MoodOptionSection
          handleMoodSelect={setSelectedMoodId}
        />

        <NotesInput
          notes={annotation}
          onChangeNotes={setAnnotation}
        />

        <SelectInput
          label='Tempo para entrega'
          options={[
            { label: '1 Semana', value: '7' },
            { label: '1 Mês', value: '30' },
            { label: '3 Meses', value: '90' },
            { label: '6 Meses', value: '180' },
          ]}
          onValueChange={(itemValue) => setDeliveryTime(String(itemValue))}
          selectedValue={deliveryTime}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
});