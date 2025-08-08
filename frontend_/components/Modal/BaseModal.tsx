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
  top: number;
  left: number;
  width?: number;
  onClose: (e?: GestureResponderEvent) => void;
  children: React.ReactNode;
  overlayDim?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  top,
  left,
  width = 140,
  onClose,
  children,
  overlayDim = false,
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
      />

      <View
        style={[styles.container, { top, left, width }]}
        pointerEvents="box-none"
      >
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  overlayDim: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  container: {
    position: 'absolute',
    zIndex: 2000,
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
