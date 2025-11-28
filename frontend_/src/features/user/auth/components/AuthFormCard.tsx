import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { ErrorContainer } from '@/share/components/ErrorContainer';
import { AuthCard } from './AuthCard';

const { width, height } = Dimensions.get('window');

interface AuthFormCardProps {
  welcomeText: string;
  subtitleText: string;
  children: React.ReactNode;
  error?: string[] | null;
}

export const AuthFormCard: React.FC<AuthFormCardProps> = ({
  welcomeText,
  subtitleText,
  error,
  children,
}) => {
  return (
    <AuthCard>
      <Text style={styles.welcomeText}>{welcomeText}</Text>
      <Text style={styles.subtitleText}>{subtitleText}</Text>
      <ErrorContainer error={error} />
      {children}
    </AuthCard>
  );
};

const styles = StyleSheet.create({
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
});
