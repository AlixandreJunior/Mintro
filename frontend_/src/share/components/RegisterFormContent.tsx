import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import SelectInput from './ui/inputs/SelectInput';
import { DateTimeInput } from './ui/inputs/DateTimeInput';
import { MainInput } from './ui/inputs/MainInput';
import { formatDatetimeToISO } from '@/share/utils/formatDatetimeToISO';

interface Item {
  id: number;
  name: string;
}

interface RegisterFormContentProps {
  items: Item[];
  selectedItemId: number | null;
  onSelectItem: (id: number) => void;
  datetime: Date;
  setDatetime: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  showTimePicker: boolean;
  setShowTimePicker: (show: boolean) => void;
  duration: number;
  setDuration: (value: number) => void;
}

export default function RegisterFormContent({
  items,
  selectedItemId,
  onSelectItem,
  datetime,
  setDatetime,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  duration,
  setDuration,
}: RegisterFormContentProps) {
  const updateDate = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      const updated = new Date(datetime);
      updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setDatetime(updated);
    }
  };

  const updateTime = (_event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      const updated = new Date(datetime);
      updated.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setDatetime(updated);
    }
  };

  return (
    <View style={styles.container}>
      <SelectInput
        label="Selecionar item"
        selectedValue={selectedItemId?.toString() || ''}
        onValueChange={(value) => onSelectItem(+value)}
        options={items.map((item) => ({
          label: item.name,
          value: item.id.toString(),
        }))}
      />

      <DateTimeInput
        labelText="Data"
        datetime={datetime}
        mode="date"
        onChange={updateDate}
        onPress={() => setShowDatePicker(true)}
        showPicker={showDatePicker}
      />

      <DateTimeInput
        labelText="Hora"
        datetime={datetime}
        mode="time"
        onChange={updateTime}
        onPress={() => setShowTimePicker(true)}
        showPicker={showTimePicker}
      />

      <MainInput
        labelText="Duração (minutos)"
        //@ts-ignore
        onChangeText={setDuration}
        keyboardType="numeric"
        value={duration.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  savingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  savingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
});
