import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type Period = 'day' | 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export default function PeriodSelector({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) {
  const periods: { key: Period; label: string }[] = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  return (
    <View style={styles.container}>
      {periods.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => onPeriodChange(key)}
          style={[styles.button, selectedPeriod === key && styles.selectedButton]}
          activeOpacity={0.7}
        >
          <Text style={[styles.text, selectedPeriod === key && styles.selectedText]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderColor: '#4CAF50',
  },
  text: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: '#666',
  },
  selectedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
