import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from '@/share/components/ProgressCircle';
import WaterDropIcon from '../../../../share/components/icons/WaterDropIcon';
import { Hydration } from '@/share/types/health/hydratation';

interface HydrationSummaryProps {
  logs: Hydration[];
  mode: 'day' | 'week' | 'month' | 'year';
  goal: number;
}

export const HydrationSummary: React.FC<HydrationSummaryProps> = ({
  logs,
  mode,
  goal,
}) => {
  // --- Cálculo do total ou média ---
  const { value, progress, label } = useMemo(() => {
    if (mode === 'day') {
      const total = logs.reduce((acc, l) => acc + l.quantity, 0);

      return {
        value: total,
        progress: Math.min(total / goal, 1), // <= garante proporcional
        label: 'Total do dia',
      };
    }

    const total = logs.reduce((acc, l) => acc + l.quantity, 0);

    const daysCount =
      mode === 'week' ? 7 : mode === 'month' ? 30 : mode === 'year' ? 365 : 1;

    const avg = total / daysCount;

    console.log(progress);

    return {
      value: Math.round(avg),
      progress: Math.min(avg / goal, 1), // <= garante proporcional
      label:
        mode === 'week'
          ? 'Média dos últimos 7 dias'
          : mode === 'month'
          ? 'Média dos últimos 30 dias'
          : 'Média dos últimos 365 dias',
    };
  }, [logs, mode, goal]);

  return (
    <View style={styles.mainContent}>
      <View style={styles.leftContent}>
        <Text style={styles.currentAmount}>{value} ml</Text>
        <Text style={styles.remainingText}>{label}</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressCircle
          progress={progress}
          size={100}
          color="#9CC9FF"
          strokeWidth={8}
        />
        <View style={styles.progressIcon}>
          <WaterDropIcon size={24} color="#0022FF" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  leftContent: { flex: 1, marginRight: 20 },
  currentAmount: {
    fontSize: 30,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#667',
    lineHeight: 20,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
