// components/MoodLineChart.tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';

interface MoodDataPoint {
  x: number;
  y: number;
  mood: Mood;
}

const MOOD_LINE_GRAPH_DATA: MoodDataPoint[] = [
  { x: 1, y: 4, mood: 'Bem' },
  { x: 2, y: 5, mood: 'Excelente' },
  { x: 3, y: 3, mood: 'Neutro' },
  { x: 7, y: 4, mood: 'Bem' },
  { x: 10, y: 2, mood: 'Mal' },
  { x: 11, y: 3, mood: 'Neutro' },
  { x: 15, y: 4, mood: 'Bem' },
  { x: 19, y: 5, mood: 'Excelente' },
  { x: 22, y: 4, mood: 'Bem' },
  { x: 27, y: 1, mood: 'Horrível' },
];

const MOOD_ICONS: { [key in Mood]: keyof typeof MaterialCommunityIcons.glyphMap } = {
  Excelente: 'robot-happy-outline',
  Bem: 'robot-outline',
  Neutro: 'robot-off-outline',
  Mal: 'robot-dead',
  Horrível: 'robot-angry-outline',
};

export default function MoodLineChart(): React.JSX.Element {
  return (
    <View style={styles.chartCard}>
      <VictoryChart
        width={width * 0.9}
        height={height * 0.25}
        theme={VictoryTheme.material}
        domainPadding={{ x: [20, 20], y: [5, 5] }}
        padding={{ top: 20, bottom: 40, left: 30, right: 30 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={['Horrível', 'Mal', 'Neutro', 'Bem', 'Excelente']}
          style={{
            axis: { stroke: '#E0E0E0' },
            tickLabels: { fontSize: width * 0.025, fill: '#666', padding: 5 },
            grid: { stroke: '#E0E0E0', strokeDasharray: '5, 5' },
          }}
        />
        <VictoryAxis
          tickValues={[1, 3, 7, 11, 15, 19, 22, 27]}
          tickFormat={(t) => Math.round(t)}
          style={{
            axis: { stroke: '#E0E0E0' },
            tickLabels: { fontSize: width * 0.03, fill: '#666' },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryLine
          data={MOOD_LINE_GRAPH_DATA}
          x="x"
          y="y"
          interpolation="linear"
          style={{ data: { stroke: '#4CAF50', strokeWidth: 3 } }}
          labels={({ datum }: { datum: MoodDataPoint }) => {
            const icon = MOOD_ICONS[datum.mood];
            const glyph = MaterialCommunityIcons.glyphMap[icon];
            return typeof glyph === 'number' ? String.fromCharCode(glyph) : '';
            }}
          labelComponent={
            <VictoryLabel
              renderInPortal
              style={{
                fontSize: width * 0.04,
                fontFamily: 'MaterialCommunityIcons',
                fill: '#4A4A4A',
              }}
              dy={-width * 0.025}
            />
          }
        />
      </VictoryChart>
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
});
