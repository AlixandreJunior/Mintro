import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import BaseCard from '@/share/components/ui/card/BaseCard';

const { width, height } = Dimensions.get('window');

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return <BaseCard style={styles.AuthCard}>{children}</BaseCard>;
};

const styles = StyleSheet.create({
  AuthCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
    maxWidth: width * 0.9,
    minWidth: width * 0.85,
    width: '100%',
  },
});
