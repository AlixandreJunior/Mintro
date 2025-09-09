import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

type DataPoint = {
  x: number;
  y: number;
};

type Mode = 'day' | 'week' | 'month' | 'year';

interface StepsChartProps {
  data: DataPoint[];
  mode?: Mode;
  barColor?: string;
}

export default function StepsChart({
  data,
  mode = 'week',
  barColor = '#D9D9D9',
}: StepsChartProps): React.ReactElement | null {
  if (mode === 'day') return null;

  const containerPaddingHorizontal = 16;
  const chartWidth = width;
  const chartHeight = 150;
  const xAxisLabelHeight = 20;
  const yAxisLabelWidth = 40;
  const baseLineOffset = 10;

  const groupData = (mode: Mode): { label: string; y: number }[] => {
    switch (mode) {
      case 'week':
        const weekLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return weekLabels.map((label, index) => {
          const values = data.filter((d) => d.x === index).map((d) => d.y);
          const total = values.reduce((sum, y) => sum + y, 0);
          return { label, y: total };
        });
      case 'month':
        return Array.from({ length: 30 }, (_, i) => {
          const values = data.filter((d) => d.x === i + 1).map((d) => d.y);
          const total = values.reduce((sum, y) => sum + y, 0);
          return { label: (i + 1).toString(), y: total };
        });
      case 'year':
        const months = [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ];
        return months.map((label, i) => {
          const values = data.filter((d) => d.x === i + 1).map((d) => d.y);
          const total = values.reduce((sum, y) => sum + y, 0);
          return { label, y: total };
        });
      default:
        return [];
    }
  };

  const grouped = groupData(mode);
  const maxY = Math.max(...grouped.map((d) => d.y), 1);
  const yAxisLabels = [0, Math.round(maxY / 2), maxY];
  const yAxisScaleFactor = chartHeight / maxY;

  const drawableWidth =
    chartWidth - yAxisLabelWidth - containerPaddingHorizontal * 2;
  const minBarWidth = 4;
  const maxBarWidth = 30;
  let barWidth = Math.min(
    maxBarWidth,
    Math.max(minBarWidth, drawableWidth / (grouped.length * 1.5))
  );
  const totalBarsWidth = barWidth * grouped.length;
  const remainingSpace = Math.max(0, drawableWidth - totalBarsWidth);
  const spacing =
    grouped.length > 1 ? remainingSpace / (grouped.length + 1) : 0;

  const getLabelInterval = (): number => {
    switch (mode) {
      case 'month':
        return 5;
      default:
        return 1;
    }
  };

  return (
    <View style={styles.chartContainer}>
      <Svg
        width={chartWidth}
        height={chartHeight + xAxisLabelHeight + baseLineOffset + 10}
      >
        {grouped.map((point, index) => {
          const rawHeight = (point.y / maxY) * chartHeight;
          const minBarHeight = 10;
          const barHeight =
            point.y > 0 ? Math.max(rawHeight, minBarHeight) : minBarHeight;
          const xPos = yAxisLabelWidth + index * (barWidth + spacing) + spacing;
          const yPos = chartHeight + baseLineOffset - barHeight;

          return (
            <Rect
              key={index}
              x={xPos}
              y={yPos}
              width={barWidth}
              height={barHeight}
              rx={8}
              ry={8}
              fill={barColor}
            />
          );
        })}

        {grouped.map((point, index) => {
          const interval = getLabelInterval();
          if (index % interval !== 0) return null;
          const xPos =
            yAxisLabelWidth +
            index * (barWidth + spacing) +
            spacing +
            barWidth / 2;
          return (
            <SvgText
              key={`label-x-${index}`}
              x={xPos}
              y={chartHeight + baseLineOffset + xAxisLabelHeight}
              textAnchor="middle"
              fontSize="10"
              fill="#000000"
              fontFamily="Poppins_400Regular"
            >
              {point.label}
            </SvgText>
          );
        })}

        <G>
          {yAxisLabels.map((tickValue, index) => {
            const yPos =
              chartHeight + baseLineOffset - tickValue * yAxisScaleFactor;
            return (
              <SvgText
                key={`label-y-${index}`}
                x={chartWidth - containerPaddingHorizontal}
                y={yPos}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="10"
                fill="#000000"
                fontFamily="Poppins_400Regular"
              >
                {tickValue === 0 ? '0' : (tickValue / 1000).toFixed(1) + 'k'}
              </SvgText>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: Dimensions.get('window').height * 0.03,
    paddingVertical: 10,
  },
});
