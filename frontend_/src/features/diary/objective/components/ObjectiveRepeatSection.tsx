import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RepeatOptionProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const RepeatOption: React.FC<RepeatOptionProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.periodOption}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.radioButton}>
        {isSelected && <View style={styles.radioButtonSelected} />}
      </View>
      <Text style={styles.periodLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

interface RepeatSectionProps {
  selectedRepeat: '1x' | '3x' | '5x' | null;
  setSelectedRepeat: React.Dispatch<
    React.SetStateAction<'1x' | '3x' | '5x' | null>
  >;
}

export const RepeatSection: React.FC<RepeatSectionProps> = ({
  selectedRepeat,
  setSelectedRepeat,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Repetir</Text>
      <View style={styles.periodCard}>
        <RepeatOption
          label="1 Vez"
          isSelected={selectedRepeat === '1x'}
          onPress={() => setSelectedRepeat('1x')}
        />
        <View style={styles.periodSeparator} />

        <RepeatOption
          label="3 Vezes"
          isSelected={selectedRepeat === '3x'}
          onPress={() => setSelectedRepeat('3x')}
        />
        <View style={styles.periodSeparator} />

        <RepeatOption
          label="5 Vezes"
          isSelected={selectedRepeat === '5x'}
          onPress={() => setSelectedRepeat('5x')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 16,
  },
  periodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    gap: 2,
    elevation: 2,
  },
  periodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  periodLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },
  periodSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: -16,
  },
});
