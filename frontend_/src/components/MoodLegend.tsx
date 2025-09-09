// components/MoodLegend.tsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Tipagens e dados movidos para cá
type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';
interface MoodCountData {
  x: Mood;
  y: number; // Contagem
  color: string; // Cor para o segmento da pizza
}
const MOOD_COLORS: { [key in Mood]: string } = {
  Excelente: '#4CAF50',
  Bem: '#8BC34A',
  Neutro: '#FFEB3B',
  Mal: '#FF9800',
  Horrível: '#F44336',
};
const MOOD_COUNT_PIE_DATA: MoodCountData[] = [
  { x: 'Excelente', y: 3, color: MOOD_COLORS['Excelente'] },
  { x: 'Bem', y: 4, color: MOOD_COLORS['Bem'] },
  { x: 'Neutro', y: 2, color: MOOD_COLORS['Neutro'] },
  { x: 'Mal', y: 1, color: MOOD_COLORS['Mal'] },
  { x: 'Horrível', y: 1, color: MOOD_COLORS['Horrível'] },
];
const MOOD_ICONS: { [key in Mood]: string } = {
  Excelente: 'robot-happy-outline',
  Bem: 'robot-outline',
  Neutro: 'robot-off-outline',
  Mal: 'robot-dead',
  Horrível: 'robot-angry-outline',
};

interface MoodLegendProps {
  // data: MoodCountData[]; // Se os dados fossem passados via props
}

export default function MoodLegend(): React.JSX.Element { // Não recebe props data
  return (
    <View style={styles.moodLegendContainer}>
      {MOOD_COUNT_PIE_DATA.map((moodItem, i) => (
        <View key={i} style={styles.moodLegendItem}>
          <View style={[styles.moodLegendColorBox, { backgroundColor: moodItem.color }]} />
          <MaterialCommunityIcons
            name={'ab-testing'}
            size={width * 0.06}
            color={moodItem.color}
            style={styles.moodLegendIcon}
          />
          <Text style={styles.moodLegendLabel}>{moodItem.x}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  moodLegendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  moodLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    marginBottom: 8,
  },
  moodLegendColorBox: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: (width * 0.03) / 2,
    marginRight: 5,
  },
  moodLegendIcon: {
    marginRight: 3,
  },
  moodLegendLabel: {
    fontSize: width * 0.035,
    color: '#333',
  },
});