import React, { useState } from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface Props {
  onEdit?: (...args: any[]) => void;
  onDelete?: (...args: any[]) => void;
}

const CardActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.wrapper}>
        <Pressable onPress={() => setOpen(true)}>
          <Entypo name="dots-three-vertical" size={20} color="#666" />
        </Pressable>
      </View>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.box}>
            <Pressable
              onPress={() => {
                setOpen(false);
                onEdit?.();
              }}
            >
              <Text style={styles.action}>Editar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setOpen(false);
                onDelete?.();
              }}
            >
              <Text style={[styles.action, { color: 'red' }]}>Excluir</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  action: {
    fontSize: 16,
    paddingVertical: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
});

export default CardActions;
