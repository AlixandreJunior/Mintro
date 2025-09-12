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
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default BaseCard;
