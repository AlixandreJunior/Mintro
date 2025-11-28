import { useMemo } from 'react';
import { DataPoint, GroupedPoint, Mode } from '../types/chart';
import {
  MAX_BAR_WIDTH,
  MIN_BAR_HEIGHT,
  MIN_BAR_WIDTH,
  PERIOD_LABELS,
} from '../constants/chart';
import {
  calculateBarWidth,
  getLabelInterval,
  normalizeBarHeight,
} from '../utils/chart';

interface UseChartParams {
  data: DataPoint[];
  mode: Mode;
  width: number;
  height: number;
  padding: number;
  yAxisLabelWidth: number;
}

export function useChart({
  data,
  mode,
  width,
  height,
  padding,
  yAxisLabelWidth,
}: UseChartParams) {
  // 1 — Agrupar dados pelo período
  const grouped: GroupedPoint[] = useMemo(() => {
    const labels = PERIOD_LABELS[mode];
    const bucket = Array.from({ length: labels.length }, () => 0);

    for (const d of data) {
      const index = mode === 'week' ? d.x : d.x - 1;
      if (index >= 0 && index < bucket.length) bucket[index] += d.y;
    }

    return labels.map(
      (label: string, i: number): GroupedPoint => ({
        label,
        y: bucket[i],
      })
    );
  }, [data, mode]);

  // 2 — Y máximo usado para escala
  const maxY = useMemo(
    () => Math.max(...grouped.map((d) => d.y), 1),
    [grouped]
  );

  // 3 — Labels do eixo Y
  const yAxisLabels = useMemo(() => [0, Math.round(maxY / 2), maxY], [maxY]);

  // 4 — Escala vertical
  const yScale = height / maxY;

  // 5 — Largura e espaçamento das barras
  const drawableWidth = width - yAxisLabelWidth - padding * 2;

  const barWidth = calculateBarWidth(drawableWidth, grouped.length);

  const totalBarWidth = barWidth * grouped.length;

  const spacing =
    grouped.length > 1
      ? (drawableWidth - totalBarWidth) / (grouped.length + 1)
      : 0;

  // 6 — Intervalo de labels do eixo X
  const labelInterval = getLabelInterval(mode);

  const bars = useMemo(
    () =>
      grouped.map((pt, i) => {
        const barHeight = normalizeBarHeight(pt.y, maxY, height);
        const x = yAxisLabelWidth + spacing + i * (spacing + barWidth);
        const y =
          barHeight >= MIN_BAR_HEIGHT
            ? barHeight + padding - normalizeBarHeight(pt.y, maxY, height)
            : barHeight + padding;

        return {
          ...pt,
          barHeight,
          x,
          y,
        };
      }),
    [grouped, barWidth, spacing, maxY, height, padding, yAxisLabelWidth]
  );

  return {
    grouped,
    bars,
    maxY,
    yScale,
    barWidth,
    spacing,
    labelInterval,
    yAxisLabels,
  };
}
