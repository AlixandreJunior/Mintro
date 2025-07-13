// components/StepsChart.tsx
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';

const { width, height } = Dimensions.get('window');

type DataPoint = {
  x: number;
  y: number;
};

interface StepsChartProps {
  data: DataPoint[];
}

export default function StepsChart({ data }: StepsChartProps): React.ReactElement {
  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10 }}
        height={height * 0.3}
        width={width * 0.95}
      >
        <VictoryAxis
          gridComponent={<></>} // remove grid horizontal
          style={{
            axis: { stroke: "none" }, // remove linha do eixo X
            ticks: { stroke: "none" }, // remove os ticks
            tickLabels: { fill: "#333" }
          }}
        />
        <VictoryAxis
          dependentAxis
          gridComponent={<></>} // remove grid vertical
          style={{
            axis: { stroke: "none" }, // remove linha do eixo Y
            ticks: { stroke: "none" },
            tickLabels: { fill: "#333" }
          }}
        />
        <VictoryBar
          data={data}
          x="x"
          y="y"
          style={{
            data: {
              fill: "#4CAF50",
              stroke: "#2E7D32",
              borderRadius: 25,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
});
