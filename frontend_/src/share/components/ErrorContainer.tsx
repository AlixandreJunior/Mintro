import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native';

const { width } = useWindowDimensions();

interface ErrorContainerProps {
  error: string | null;
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({ error }) => {
  return (
    <>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
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
  },
});
