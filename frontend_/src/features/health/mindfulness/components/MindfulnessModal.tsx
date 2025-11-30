import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';

interface MindfulnessModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { duration: number; datetime: Date }) => void;
  initialDuration: number;
  initialDatetime: Date;
}

const MindfulnessModal: React.FC<MindfulnessModalProps> = ({
  visible,
  onClose,
  onSave,
  initialDuration,
  initialDatetime,
}) => {
  const [duration, setDuration] = useState(initialDuration);

  const [date, setDate] = useState(initialDatetime);
  const [time, setTime] = useState(initialDatetime);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const datetime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    onSave({ duration, datetime });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Mindfulness</Text>

          {/* DATE */}
          <DateTimeInput
            labelText="Data"
            datetime={date}
            mode="date"
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            onChange={(_e, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />

          {/* TIME */}
          <DateTimeInput
            labelText="Horário"
            datetime={time}
            mode="time"
            showPicker={showTimePicker}
            onPress={() => setShowTimePicker(true)}
            onChange={(_e, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />

          <MainInput
            labelText="Duração (minutos)"
            keyboardType="numeric"
            value={duration.toString()}
            onChangeText={(t) => setDuration(Number(t))}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    marginLeft: 16,
  },
  cancelText: {
    color: '#888',
  },
  saveText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default MindfulnessModal;
