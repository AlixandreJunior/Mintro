import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useToast } from '@/share/providers/ToastProvider';

interface HydrationGoalModalProps {
  visible: boolean;
  currentGoal: number | null;
  onClose: () => void;
  onSave: (goal: number) => void;
}

const HydrationGoalModal: React.FC<HydrationGoalModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSave,
}) => {
  const { showToast } = useToast();
  const [goal, setGoal] = useState<string>(currentGoal?.toString() ?? '');

  useEffect(() => {
    setGoal(currentGoal?.toString() ?? '');
  }, [currentGoal, visible]);

  const handleSave = () => {
    const numericGoal = parseInt(goal, 10);
    if (isNaN(numericGoal) || numericGoal <= 0) {
      showToast('Informe uma meta válida', 'error');
      return;
    }
    onSave(numericGoal);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Alterar Meta de Hidratação (ml)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}
            placeholder="Ex: 2000"
          />
          <View style={styles.buttons}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HydrationGoalModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
