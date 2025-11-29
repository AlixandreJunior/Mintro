import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import ReminderModalButtons from '@/features/user/reminder/components/ReminderModalButtons';
import { useToast } from '@/share/providers/ToastProvider';

interface StepsGoalModalProps {
  visible: boolean;
  currentGoal: number | null;
  onClose: () => void;
  onSave: (newGoal: number) => void;
  errors?: string[];
}

const StepsGoalModal: React.FC<StepsGoalModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSave,
  errors = [],
}) => {
  const [goal, setGoal] = useState(currentGoal?.toString() ?? '');
  const { showToast } = useToast();

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
          <Text style={styles.title}>Defina sua meta diária de passos</Text>

          <MainInput
            labelText="Meta de Passos"
            value={goal}
            onChangeText={setGoal}
            keyboardType="numeric"
            placeholder="Ex: 10000"
            errors={errors}
          />

          <ReminderModalButtons onClose={onClose} onSave={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

export default StepsGoalModal;

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
