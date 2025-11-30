import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface InfoCardProps {
  icon?: React.ReactNode;
  value: number | string;
  label: string;
  backgroundColor?: string;
  borderColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  value,
  label,
  backgroundColor = '#FFFFFF',
  borderColor = '#F3F4F6',
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.iconAndValue}>
        <Text style={styles.valueText}>{value}</Text>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.4,
    height: height * 0.095,
    borderWidth: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.015,
  },
  iconAndValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.015,
    marginBottom: height * 0.005,
  },
  valueText: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
  },
  label: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins_300Light',
    color: '#000',
    lineHeight: width * 0.03,
    textAlign: 'center',
  },
});

export default InfoCard;
