import BaseCard from '@/share/components/ui/card/BaseCard';
import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: width * 0.005,
    elevation: 2,
    padding: width * 0.04,
  },
});

export default HealthCard;
