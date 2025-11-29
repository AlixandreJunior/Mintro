import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import { useToast } from '@/share/providers/ToastProvider';
import ReminderModalButtons from '@/features/user/reminder/components/ReminderModalButtons';

interface HydrationGoalModalProps {
  visible: boolean;
  currentGoal: number | null;
  onClose: () => void;
  onSave: (goal: number) => void;
  errors?: string[];
}

const HydrationGoalModal: React.FC<HydrationGoalModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSave,
  errors = [],
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
        <View style={styles.container}>
          <Text style={styles.title}>Defina sua meta diária de hidratação</Text>

          <MainInput
            labelText="Meta de Hidratação (ml)"
            value={goal}
            onChangeText={setGoal}
            keyboardType="numeric"
            placeholder="Ex: 2000"
            errors={errors}
          />

          <ReminderModalButtons onClose={onClose} onSave={handleSave} />
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
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
});
