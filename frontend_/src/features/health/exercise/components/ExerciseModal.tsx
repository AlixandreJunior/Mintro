import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import { Picker } from '@react-native-picker/picker';

interface Exercise {
  id: number;
  name: string;
}

interface ExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    exercise: number;
    duration: number;
    datetime: Date;
  }) => void;

  exercises: Exercise[];
  initialExerciseId: number;
  initialDuration: number;
  initialDatetime: Date;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  visible,
  onClose,
  onSave,
  exercises,
  initialExerciseId,
  initialDuration,
  initialDatetime,
}) => {
  const [exerciseId, setExerciseId] = useState(initialExerciseId);
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

    onSave({ exercise: exerciseId, duration, datetime });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Exercício</Text>

          <Text style={styles.label}>Exercício</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={exerciseId}
              onValueChange={(v) => setExerciseId(Number(v))}
            >
              {exercises.map((ex) => (
                <Picker.Item key={ex.id} label={ex.name} value={ex.id} />
              ))}
            </Picker>
          </View>

          <DateTimeInput
            labelText="Data"
            datetime={date}
            mode="date"
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            onChange={(_e, selected) => {
              setShowDatePicker(false);
              if (selected) setDate(selected);
            }}
          />

          <DateTimeInput
            labelText="Horário"
            datetime={time}
            mode="time"
            showPicker={showTimePicker}
            onPress={() => setShowTimePicker(true)}
            onChange={(_e, selected) => {
              setShowTimePicker(false);
              if (selected) setTime(selected);
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
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#444',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: { marginLeft: 16 },
  cancelText: { color: '#999' },
  saveText: { color: '#007AFF', fontWeight: 'bold' },
});

export default ExerciseModal;
