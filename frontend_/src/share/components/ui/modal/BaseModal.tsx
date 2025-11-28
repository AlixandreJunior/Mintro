import React from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Platform,
  GestureResponderEvent,
} from 'react-native';

interface BaseModalProps {
  visible: boolean;
  onClose: (e?: GestureResponderEvent) => void;
  children: React.ReactNode;
  overlayDim?: boolean;
  align?: 'center' | 'top' | 'bottom'; // nova prop para controle
  width?: number;
}

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  overlayDim = false,
  align = 'center',
  width = 280,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={[styles.overlay, overlayDim ? styles.overlayDim : undefined]}
        onPress={onClose}
      >
        <View
          style={[
            styles.container,
            align === 'top' && { justifyContent: 'flex-start' },
            align === 'bottom' && { justifyContent: 'flex-end' },
          ]}
          pointerEvents="box-none"
        >
          <View style={[styles.content, { width }]}>{children}</View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlayDim: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // centraliza por padrão
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : 0.35,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default BaseModal;
