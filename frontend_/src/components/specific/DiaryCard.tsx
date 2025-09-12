import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import BaseCard from '../ui/card/BaseCard';

interface DiaryCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DiaryCard: React.FC<DiaryCardProps> = ({ children, style }) => {
  return <BaseCard style={[styles.card, style]}>{children}</BaseCard>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default DiaryCard;
