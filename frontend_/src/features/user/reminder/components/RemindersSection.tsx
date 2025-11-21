import React, { Dispatch, SetStateAction, FC, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { DateTimeInput } from '../../../../share/components/ui/inputs/DateTimeInput';

interface RemindersSectionProps {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
}

export const RemindersSection: FC<RemindersSectionProps> = ({
  enabled,
  setEnabled,
  time,
  setTime,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const parseTimeStringToDate = (timeStr: string) => {
    if (!timeStr) return new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.reminderHeader}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{
            false: styles.switchTrackFalse.color,
            true: styles.switchTrackTrue.color,
          }}
          thumbColor={styles.switchThumb.color}
        />
      </View>

      {enabled && (
        <DateTimeInput
          labelText="Horário do lembrete"
          datetime={parseTimeStringToDate(time)}
          showPicker={showPicker}
          onPress={() => setShowPicker(false)}
          onChange={handleChange}
          mode="time"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2B2B2B',
    marginBottom: 12,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchTrackFalse: {
    color: '#E5E7EB',
  },
  switchTrackTrue: {
    color: '#B3E0B3',
  },
  switchThumb: {
    color: '#FFFFFF',
  },
  timeInputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  timeInputText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
