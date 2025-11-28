// utils/summary.ts
import { Step } from '@/share/types/health/steps';

export type StepsMode = 'day' | 'week' | 'month' | 'year';

export function buildStepsSummary(logs: Step[], mode: StepsMode, goal: number) {
  if (!logs.length) {
    return {
      value: 0,
      progress: 0,
      label: 'Nenhum registro no período',
    };
  }

  const total = logs.reduce((acc, s) => acc + s.steps, 0);
  const progress = Math.min(100, Math.round((total / goal) * 100));

  // Média = total dividido pela quantidade de dias representados
  const daysCount = new Set(logs.map((l) => l.date)).size;
  const avg = Math.round(total / daysCount);

  let label = '';

  switch (mode) {
    case 'day':
      const remaining = Math.max(0, goal - total);
      label = `Faltam ${remaining.toLocaleString(
        'pt-BR'
      )} passos para atingir sua meta diária`;
      break;

    case 'week':
      label = `Média diária: ${avg.toLocaleString('pt-BR')} passos`;
      break;

    case 'month':
      label = `Média diária no mês: ${avg.toLocaleString('pt-BR')} passos`;
      break;

    case 'year':
      label = `Média diária no ano: ${avg.toLocaleString('pt-BR')} passos`;
      break;
  }

  return {
    value: mode === 'day' ? total : avg,
    progress,
    label,
  };
}
