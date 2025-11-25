import BaseCard from '@/share/components/ui/card/BaseCard';
import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface HealthCardProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const HealthCard: React.FC<HealthCardProps> = ({ style, children }) => {
  return <BaseCard style={[styles.card, style]}>{children}</BaseCard>;
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
  },
});

export default HealthCard;
