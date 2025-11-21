import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from '../../../share/components/ui/modal/BaseModal';

interface DiaryModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleteTextStyle?: object;
}

const DiaryModal: React.FC<DiaryModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  deleteTextStyle,
}) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => {
          onEdit();
          onClose();
        }}
      >
        <Text style={styles.text}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => {
          onDelete();
          onClose();
        }}
      >
        <Text style={[styles.text, deleteTextStyle || styles.deleteText]}>
          Excluir
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 14,
    color: '#111827',
  },
  deleteText: {
    color: 'red',
  },
});

export default DiaryModal;
