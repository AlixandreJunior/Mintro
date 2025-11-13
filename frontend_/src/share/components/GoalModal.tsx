// components/GoalModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: number) => void;
  currentValue: number;
  goalType: 'hydration' | 'steps' | 'exercise' | 'mindfulness';
}

const goalLabels: Record<GoalModalProps['goalType'], string> = {
  hydration: 'Meta de Hidratação (ml)',
  steps: 'Meta de Passos',
  exercise: 'Meta de Exercícios por Semana',
  mindfulness: 'Meta de Mindfulness por Semana',
};

export default function GoalModal({
  visible,
  onClose,
  onSave,
  currentValue,
  goalType,
}: GoalModalProps) {
  const [value, setValue] = useState(String(currentValue));

  useEffect(() => {
    setValue(String(currentValue));
  }, [currentValue]);

  const handleSave = () => {
    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      onSave(numericValue);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modal}
        >
          <Text style={styles.title}>{goalLabels[goalType]}</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
