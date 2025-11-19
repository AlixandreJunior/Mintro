import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';

interface DiaryDateTimeRowProps {
  selectedDate: Date;
  onChangeDate: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;

  selectedTime: Date;
  onChangeTime: (date: Date) => void;
  showTimePicker: boolean;
  setShowTimePicker: (show: boolean) => void;
}

export const DiaryDateTimeRow: React.FC<DiaryDateTimeRowProps> = ({
  selectedDate,
  onChangeDate,
  showDatePicker,
  setShowDatePicker,

  selectedTime,
  onChangeTime,
  showTimePicker,
  setShowTimePicker,
}) => {
  return (
    <View style={styles.dateTimeContainer}>
      <View style={styles.dateInputWrapper}>
        <DateTimeInput
          labelText="Data"
          datetime={selectedDate}
          showPicker={showDatePicker}
          mode="date"
          onPress={() => setShowDatePicker(true)}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) onChangeDate(date);
          }}
        />
      </View>

      <View style={styles.timeInputWrapper}>
        <DateTimeInput
          labelText="Hora"
          datetime={selectedTime}
          showPicker={showTimePicker}
          mode="time"
          onPress={() => setShowTimePicker(true)}
          onChange={(_, time) => {
            setShowTimePicker(false);
            if (time) onChangeTime(time);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  dateInputWrapper: {
    flex: 1,
    marginRight: 8,
  },
  timeInputWrapper: {
    flex: 1,
  },
});
