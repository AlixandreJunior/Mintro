// CardActions.tsx
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

const CardActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();

  const iconSize = width * 0.05; // ícone proporcional à tela
  const paddingBox = width * 0.05; // padding do modal
  const fontSize = width * 0.04; // fonte proporcional
  const verticalPadding = width * 0.04; // padding vertical dos botões

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.wrapper}>
        <Entypo name="dots-three-vertical" size={iconSize} color="#666" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={[styles.box, { padding: paddingBox }]}>
            <Pressable
              onPress={() => {
                setOpen(false);
                onEdit?.();
              }}
            >
              <Text
                style={[
                  styles.action,
                  { fontSize, paddingVertical: verticalPadding },
                ]}
              >
                Editar
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setOpen(false);
                onDelete?.();
              }}
            >
              <Text
                style={[
                  styles.action,
                  { fontSize, paddingVertical: verticalPadding, color: 'red' },
                ]}
              >
                Excluir
              </Text>
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
    alignSelf: 'flex-start', // evita ocupar toda altura
    paddingLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  action: {
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },
});

export default CardActions;
