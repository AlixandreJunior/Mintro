import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface MainCardProps {
  children: ReactNode;
  style?: ViewStyle;
}

const MainCard: React.FC<MainCardProps> = ({ children, style }) => {
  return <SafeAreaView style={[styles.card, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.05,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    marginVertical: height * 0.01,
  },
});

export default MainCard;
