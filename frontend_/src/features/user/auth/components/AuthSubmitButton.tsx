import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AuthSubmitButtonProps {
  handleSubmit: (event: GestureResponderEvent) => void;
  textSubmit: string;
}

export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  handleSubmit,
  textSubmit,
}) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitText}>{textSubmit}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#79D457',
    borderRadius: 16,
    paddingVertical: height * 0.022,
    justifyContent: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    shadowColor: '#79D457',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: height * 0.06,
  },
  submitText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
