import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface Period<K> {
  key: K;
  label: string;
}

interface PeriodSelectorProps<K> {
  periods: Period<K>[];
  selectedPeriod: K;
  onPeriodChange: (period: K) => void;
}

export default function PeriodSelector<K extends string>({
  periods,
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps<K>) {
  return (
    <View style={styles.container}>
      {periods.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => onPeriodChange(key)}
          style={[
            styles.button,
            selectedPeriod === key && styles.selectedButton,
          ]}
        >
          <Text
            style={[styles.text, selectedPeriod === key && styles.selectedText]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: height * 0.005,
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
    fontFamily: 'Poppins_400Regular',
  },
  selectedText: {
    color: '#4CAF50',
    fontFamily: 'Poppins_400Regular',
  },
});
