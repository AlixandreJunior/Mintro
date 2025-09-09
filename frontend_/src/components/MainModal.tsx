import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface MainModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  backgroundColor?: string;
}

const MainModal: React.FC<MainModalProps> = ({
  visible,
  onClose,
  children,
  transparent = true,
  animationType = 'fade',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.backdrop, { backgroundColor }]}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modalContainer}
            >
              {children}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    minWidth: '80%',
    maxWidth: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MainModal;
