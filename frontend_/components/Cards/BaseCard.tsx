import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface BaseCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BaseCard: React.FC<BaseCardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default BaseCard;
