import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native';
import BaseCard from '../ui/card/BaseCard';

const { width, height } = Dimensions.get('window');

interface EntryFormCardProps {
  welcomeText: string;
  subtitleText: string;
  error: string | null;
  children: React.ReactNode;
  handleSubmit: (event: GestureResponderEvent) => void;
  textSubmit: string;
  backText: string;
  handleBack: (event: GestureResponderEvent) => void;
  backLink: string;
}

export const EntryFormCard: React.FC<EntryFormCardProps> = ({
  welcomeText,
  subtitleText,
  error,
  children,
  handleSubmit,
  textSubmit,
  backText,
  handleBack,
  backLink,
}) => {
  return (
    <BaseCard style={styles.formCard}>
      <Text style={styles.welcomeText}>{welcomeText}</Text>
      <Text style={styles.subtitleText}>{subtitleText}</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {children}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{textSubmit}</Text>
      </TouchableOpacity>

      <View style={styles.backContainer}>
        <Text style={styles.backText}>{backText} </Text>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backLink}>{backLink}</Text>
        </TouchableOpacity>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  formCard: {
    borderRadius: 16,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
    width: '100%',
    maxWidth: width * 0.9,
    minWidth: width * 0.85,
  },
  welcomeText: {
    fontSize: width * 0.065,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
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
  submitButton: {
    backgroundColor: '#79D457',
    borderRadius: 16,
    paddingVertical: height * 0.022,
    alignItems: 'center',
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
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    fontWeight: '400',
  },
  backLink: {
    fontSize: width * 0.04,
    color: '#79D457',
    fontWeight: '600',
  },
});
