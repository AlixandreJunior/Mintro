import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DateTimeInputProps {
  labelText: string;
  onPress: (event: GestureResponderEvent) => void;
  datetime: Date;
  showPicker: boolean;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  mode: 'time' | 'date';
  errors?: string[];
  maximumDate?: Date; // opcional
  minimumDate?: Date; // opcional
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  labelText,
  onPress,
  datetime,
  showPicker,
  onChange,
  mode,
  errors,
  maximumDate,
  minimumDate,
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.inputLabel}>{labelText}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.textInputStyle,
          styles.pickerButton,
          errors ? { borderColor: '#EF4444' } : null,
        ]}
      >
        <Text style={styles.pickerButtonText}>
          {mode === 'time'
            ? datetime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : datetime.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={datetime}
          mode={mode}
          display="default"
          onChange={onChange}
          {...(maximumDate && { maximumDate })}
          {...(minimumDate && { minimumDate })}
        />
      )}

      {errors &&
        errors.map((errMsg, index) => (
          <Text key={index} style={styles.errorText}>
            {errMsg}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 2,
  },
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
    fontFamily: 'Poppins_400Regular',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
