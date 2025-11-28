import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import BaseCard from '@/share/components/ui/card/BaseCard';

const { width, height } = Dimensions.get('window');

interface ProfileCardProps {
  children: React.ReactNode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ children }) => {
  return <BaseCard style={styles.formCardCommon}>{children}</BaseCard>;
};

const styles = StyleSheet.create({
  formCardCommon: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    width: width * 0.9,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.06,
  },
});
