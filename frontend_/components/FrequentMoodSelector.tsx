// components/FrequentMoodSelector.tsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Tipagens e dados movidos para cá
type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';
const MOOD_COLORS: { [key in Mood]: string } = {
  Excelente: '#4CAF50',
  Bem: '#8BC34A',
  Neutro: '#FFEB3B',
  Mal: '#FF9800',
  Horrível: '#F44336',
};
const MOOD_ICONS: { [key in Mood]: string } = {
  Excelente: 'robot-happy-outline',
  Bem: 'robot-outline',
  Neutro: 'robot-off-outline',
  Mal: 'robot-dead',
  Horrível: 'robot-angry-outline',
};

interface FrequentMoodSelectorProps {
  selectedMood: Mood;
  onSelect: (mood: Mood) => void;
}

export default function FrequentMoodSelector({ selectedMood, onSelect }: FrequentMoodSelectorProps): React.JSX.Element {
  return (
    <View style={styles.frequentMoodSelector}>
      <MaterialCommunityIcons
        name={'ab-testing'}
        size={width * 0.05}
        color={MOOD_COLORS[selectedMood]}
      />
      <Text style={styles.frequentMoodText}>{selectedMood}</Text>
      <Text style={styles.frequentMoodCount}>(3x)</Text>
      <MaterialCommunityIcons name="chevron-down" size={width * 0.05} color="#666" />
    </View>
  );
}

const styles = StyleSheet.create({
  frequentMoodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  frequentMoodText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  frequentMoodCount: {
    fontSize: width * 0.04,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
});