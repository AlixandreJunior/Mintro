import React from 'react';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import { CHART_LAYOUT } from '@/share/constants/chart';
import { useChart } from '@/share/hooks/useChart';
import { DataPoint, Mode } from '@/share/types/chart';

interface ChartProps {
  data: DataPoint[];
  mode?: Mode;
  barColor?: string;
}

export default function Chart({
  data,
  mode = 'week',
  barColor = '#D9D9D9',
}: ChartProps) {
  if (mode === 'day') return null;

  const {
    width,
    height: chartHeight,
    padding,
    xAxisLabelHeight,
    yAxisLabelWidth,
    baseLineOffset,
  } = CHART_LAYOUT;

  const {
    bars,
    grouped,
    yAxisLabels,
    yScale,
    barWidth,
    spacing,
    labelInterval,
  } = useChart({
    data,
    mode,
    width,
    height: chartHeight,
    padding,
    yAxisLabelWidth,
  });

  return (
    <Svg
      width={width}
      height={chartHeight + xAxisLabelHeight + baseLineOffset + 10}
    >
      {bars.map((b, i) => (
        <Rect
          key={i}
          x={b.x}
          y={chartHeight + baseLineOffset - b.barHeight}
          width={barWidth}
          height={b.barHeight}
          rx={8}
          ry={8}
          fill={barColor}
        />
      ))}

      {grouped.map((pt, i) => {
        if (i % labelInterval !== 0) return null;

        const x =
          yAxisLabelWidth + spacing + i * (spacing + barWidth) + barWidth / 2;

        return (
          <SvgText
            key={`x-${i}`}
            x={x}
            y={chartHeight + baseLineOffset + xAxisLabelHeight}
            textAnchor="middle"
            fontSize="10"
            fill="#000"
          >
            {pt.label}
          </SvgText>
        );
      })}

      <G>
        {yAxisLabels.map((v, i) => {
          const y = chartHeight + baseLineOffset - v * yScale;

          return (
            <SvgText
              key={i}
              x={width - padding}
              y={y}
              textAnchor="end"
              fontSize="10"
              fill="#000"
            >
              {v === 0 ? '0' : (v / 1000).toFixed(1) + 'k'}
            </SvgText>
          );
        })}
      </G>
    </Svg>
  );
}
