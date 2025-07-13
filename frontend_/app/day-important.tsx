import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { MainInput } from '@/components/Inputs/MainInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import SelectInput from '@/components/Inputs/SelectInput';
import SwitchInputGroup from '@/components/Inputs/SwitchInputGroup';

const { width, height } = Dimensions.get('window');

interface RemindersState {
  onDay: boolean;
  oneDayBefore: boolean;
  oneWeekBefore: boolean;
  oneMonthBefore: boolean;
}

export default function App(): React.JSX.Element {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('Saudade');
  const [reminders, setReminders] = useState<RemindersState>({
    onDay: true,
    oneDayBefore: true,
    oneWeekBefore: true,
    oneMonthBefore: true,
  });

  const reminderOptions = [
    { key: 'onDay', label: 'No Dia', value: reminders.onDay },
    { key: 'oneDayBefore', label: 'Um dia antes', value: reminders.oneDayBefore },
    { key: 'oneWeekBefore', label: '1 Semana Antes', value: reminders.oneWeekBefore },
    { key: 'oneMonthBefore', label: '1 Mês Antes', value: reminders.oneMonthBefore },
  ];

  const emotionOptions = [
    { label: 'Saudade', value: 'Saudade' },
    { label: 'Alegria', value: 'Alegria' },
    { label: 'Tristeza', value: 'Tristeza' },
    { label: 'Amor', value: 'Amor' },
    { label: 'Gratidão', value: 'Gratidão' },
  ];

  const handleSavePress = () => {
    Alert.alert(
      'Salvar',
      `Nome: ${eventName}\nData: ${eventDate.toLocaleDateString()}\nEmoção: ${selectedEmotion}\nLembretes: ${JSON.stringify(reminders, null, 2)}`
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios');
    setEventDate(currentDate);
  };

  const toggleReminder = (reminderType: keyof RemindersState) => {
    setReminders((prev) => ({
      ...prev,
      [reminderType]: !prev[reminderType],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar='A' />
      <FormHeader title='Dia Importante' onSavePress={handleSavePress} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <MainInput
          labelText='Nome'
          keyboardType='default'
          onChangeText={setEventName}
          value={eventName}
          placeholder='Nome'
        />

        <DateTimeInput
          labelText='Data'
          mode='date'
          onChange={onDateChange}
          onPress={() => setShowDatePicker(true)}
          showPicker={showDatePicker}
          datetime={eventDate}
        />

        <SelectInput
          label='Emoção Associada'
          onValueChange={(itemValue) => setSelectedEmotion(String(itemValue))}
          options={emotionOptions}
          selectedValue={selectedEmotion}
        />

        <SwitchInputGroup
          containerLabel='Lembretes'
          items={reminderOptions}
          //@ts-ignore
          onToggle={(key) => toggleReminder(key)}
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
});
