import { MainButton } from '@/share/components/ui/button/MainButton';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ReminderModalButtonsProps {
  onClose: () => void;
  onSave: () => void;
}

const ReminderModalButtons: React.FC<ReminderModalButtonsProps> = ({
  onClose,
  onSave,
}) => {
  return (
    <View style={styles.actions}>
      <MainButton label="Cancelar" onPress={onClose} color={'#DB2020'} />

      <MainButton label="Salvar" onPress={onSave} color={'#12C95B'} />
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
});

export default ReminderModalButtons;
