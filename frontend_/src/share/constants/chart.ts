import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const CHART_LAYOUT = {
  width,
  height: 150,
  padding: 16,
  xAxisLabelHeight: 20,
  yAxisLabelWidth: 40,
  baseLineOffset: 10,
};

export const PERIOD_LABELS = {
  day: [], // <= ADICIONADO
  week: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const,
  month: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
  year: [
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
  ] as const,
} as const;

export const MIN_BAR_WIDTH = 4;
export const MAX_BAR_WIDTH = 30;
export const MIN_BAR_HEIGHT = 10;
