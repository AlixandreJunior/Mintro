import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ErrorContainerProps {
  error?: string[] | null;
  duration?: number;
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({
  error,
  duration = 4000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!error || error.length === 0) return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timer);
  }, [error, duration]);

  if (!error || error.length === 0 || !visible) return null;

  return (
    <View style={styles.errorContainer}>
      {error.map((errMsg, index) => (
        <Text key={index} style={styles.errorText}>
          {errMsg}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: width * 0.035,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
});
