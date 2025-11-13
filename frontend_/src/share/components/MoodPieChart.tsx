// components/MoodPieChart.tsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';

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

interface MoodPieChartProps {
  // data: MoodCountData[]; // Se os dados fossem passados via props
}

export default function MoodPieChart(): React.JSX.Element { // Não recebe props data
  return (
    <View style={styles.chartCard}>
      <VictoryPie
        data={MOOD_COUNT_PIE_DATA} // Usa os dados internos
        x="x"
        y="y"
        colorScale={MOOD_COUNT_PIE_DATA.map((d) => d.color)}
        innerRadius={width * 0.15}
        padAngle={1}
        labels={() => null}
        width={width * 0.7}
        height={width * 0.7}
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        labelRadius={width * 0.15 + 10}
      />
      <View style={styles.pieCenterLabel}>
        <Text style={styles.pieCenterNumber}>
          {MOOD_COUNT_PIE_DATA.reduce((sum, d) => sum + d.y, 0)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  pieCenterLabel: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width * 0.7 / 2 }, { translateY: -width * 0.7 / 2 }],
    width: width * 0.7,
    height: width * 0.7,
  },
  pieCenterNumber: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#333',
  },
});