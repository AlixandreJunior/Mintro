import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';

interface HydrationModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { quantity: number; date: Date }) => void;
  initialQuantity: number;
  initialDate: Date;
}

const HydrationModal: React.FC<HydrationModalProps> = ({
  visible,
  onClose,
  onSave,
  initialQuantity,
  initialDate,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [date, setDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    onSave({ quantity, date });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Registro</Text>

          <DateTimeInput
            labelText="Data"
            datetime={date}
            mode="date"
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            onChange={(_e, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />

          <MainInput
            labelText="Quantidade"
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(Number(text))}
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    marginLeft: 16,
  },
  cancelText: {
    fontSize: 14,
    color: '#888',
  },
  saveText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default HydrationModal;
