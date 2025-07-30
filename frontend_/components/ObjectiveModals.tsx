import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator } from 'react-native-paper';
import MainModal from './MainModal';

interface ObjectiveModalsProps {
  isReminderModalVisible: boolean;
  isRepeatModalVisible: boolean;
  reminder: string | null;
  repeat: string;
  updating?: boolean;
  onChangeReminder: (value: string | null) => void;
  onChangeRepeat: (value: string) => void;
  closeReminderModal: () => void;
  closeRepeatModal: () => void;
}

const ObjectiveModals: React.FC<ObjectiveModalsProps> = ({
  isReminderModalVisible,
  isRepeatModalVisible,
  reminder,
  repeat,
  updating = false,
  onChangeReminder,
  onChangeRepeat,
  closeReminderModal,
  closeRepeatModal,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (_: any, selected?: Date) => {
    if (selected) {
      setSelectedDate(selected);
      const timeString = selected.toTimeString().slice(0, 5); // formato "HH:MM"
      onChangeReminder(timeString);
    }
    setShowTimePicker(false);
  };

  const onReminderSave = () => {
    closeReminderModal();
  };

  const onRepeatSelect = (times: number) => {
    onChangeRepeat(times.toString());
    closeRepeatModal();
  };

  return (
    <>
      <MainModal visible={isRepeatModalVisible} onClose={closeRepeatModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Repetir objetivo</Text>
          {[1, 3, 5].map((times) => (
            <Pressable
              key={times}
              style={styles.optionButton}
              onPress={() => onRepeatSelect(times)}
              disabled={updating}
            >
              <Text style={styles.optionText}>{times} vez(es)</Text>
            </Pressable>
          ))}
          {updating && (
            <ActivityIndicator
              size="small"
              color="#000"
              style={{ marginTop: 15 }}
            />
          )}
        </View>
      </MainModal>

      <MainModal visible={isReminderModalVisible} onClose={closeReminderModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolha o horário do lembrete</Text>

          <Pressable
            style={[styles.optionButton, { backgroundColor: '#DDEFFF' }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.optionText}>
              {selectedDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Pressable>

          {showTimePicker && (
            <DateTimePicker
              mode="time"
              value={selectedDate}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              is24Hour
            />
          )}

          <Pressable
            style={[styles.optionButton, { backgroundColor: '#A6E1AF' }]}
            onPress={onReminderSave}
            disabled={updating}
          >
            <Text style={styles.optionText}>Salvar Lembrete</Text>
          </Pressable>

          {updating && (
            <ActivityIndicator
              size="small"
              color="#000"
              style={{ marginTop: 10 }}
            />
          )}
        </View>
      </MainModal>
    </>
  );
};

export default ObjectiveModals;

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    gap: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
