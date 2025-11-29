import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface StepsGoalModalProps {
  visible: boolean;
  currentGoal: number | null;
  onClose: () => void;
  onSave: (newGoal: number) => void;
}

const StepsGoalModal: React.FC<StepsGoalModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSave,
}) => {
  const [goal, setGoal] = useState(currentGoal?.toString() || '');

  useEffect(() => {
    setGoal(currentGoal?.toString() || '');
  }, [currentGoal]);

  const handleSave = () => {
    const parsed = Number(goal);
    if (!parsed || parsed <= 0) return;
    onSave(parsed);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Atualizar meta de passos</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={goal}
            onChangeText={setGoal}
            placeholder="Digite sua meta"
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.save]}
              onPress={handleSave}
            >
              <Text style={{ color: '#fff' }}>Salvar</Text>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 16,
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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  save: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
});

export default StepsGoalModal;
