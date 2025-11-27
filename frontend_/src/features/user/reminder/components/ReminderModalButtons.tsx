import { Modal, View, Text, Button, Switch, StyleSheet } from 'react-native';

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
      <Button title="Cancelar" onPress={onClose} color="#888" />
      <Button title="Salvar" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default ReminderModalButtons;
