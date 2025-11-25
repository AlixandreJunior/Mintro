import {
  MAX_BAR_WIDTH,
  MIN_BAR_HEIGHT,
  MIN_BAR_WIDTH,
  PERIOD_LABELS,
} from '../constants/chart';
import { DataPoint, GroupedPoint, Mode } from '../types/chart';

export function groupData(data: DataPoint[], mode: Mode): GroupedPoint[] {
  const labels = PERIOD_LABELS[mode];
  const bucket = Array.from({ length: labels.length }, () => 0);

  for (const d of data) {
    const index = mode === 'week' ? d.x : d.x - 1;
    if (index >= 0 && index < bucket.length) bucket[index] += d.y;
  }

  return labels.map((label, i) => ({ label, y: bucket[i] }));
}

export function calculateBarWidth(drawableWidth: number, itemCount: number) {
  return Math.min(
    MAX_BAR_WIDTH,
    Math.max(MIN_BAR_WIDTH, drawableWidth / (itemCount * 1.5))
  );
}

export function normalizeBarHeight(
  value: number,
  maxY: number,
  chartHeight: number
) {
  if (value === 0) return MIN_BAR_HEIGHT;
  const scaled = (value / maxY) * chartHeight;
  return Math.max(scaled, MIN_BAR_HEIGHT);
}

export function getLabelInterval(mode: Mode) {
  return mode === 'month' ? 5 : 1;
}
