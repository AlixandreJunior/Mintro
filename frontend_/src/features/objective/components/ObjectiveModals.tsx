import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator } from 'react-native-paper';
import MainModal from '../../../share/components/MainModal';

type ModalType = 'reminder' | 'repeat' | null;

interface ObjectiveModalsProps {
  visibleModal: ModalType;
  reminder?: string | null;
  repeat?: string | null;
  updating?: boolean;
  onChange: (type: 'reminder' | 'repeat', value: string | null) => void;
  onClose: () => void;
}

const ObjectiveModals: React.FC<ObjectiveModalsProps> = ({
  visibleModal,
  reminder,
  repeat,
  updating = false,
  onChange,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (reminder) {
      const [hour, minute] = reminder.split(':').map(Number);
      const d = new Date();
      d.setHours(hour, minute, 0, 0);
      setSelectedDate(d);
    }
  }, [reminder]);

  const onTimeChange = (_event: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (selected) {
      setSelectedDate(selected);
      const timeString = selected.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      onChange('reminder', timeString);
    }
  };

  const handleReminderSave = () => {
    onClose();
  };

  const handleRepeatSelect = (times: number) => {
    onChange('repeat', times.toString());
    onClose();
  };

  return (
    <>
      <MainModal visible={visibleModal === 'repeat'} onClose={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Repetir objetivo</Text>
          {[1, 3, 5].map((times) => {
            const isSelected = repeat === times.toString();
            return (
              <Pressable
                key={times}
                style={[
                  styles.optionButton,
                  isSelected && { backgroundColor: '#A6E1AF' },
                ]}
                onPress={() => handleRepeatSelect(times)}
                disabled={updating}
              >
                <Text style={styles.optionText}>{times} vez(es)</Text>
              </Pressable>
            );
          })}
          {updating && (
            <ActivityIndicator
              size="small"
              color="#000"
              style={{ marginTop: 15 }}
            />
          )}
        </View>
      </MainModal>

      <MainModal visible={visibleModal === 'reminder'} onClose={onClose}>
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
                hour12: false,
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
            onPress={handleReminderSave}
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
