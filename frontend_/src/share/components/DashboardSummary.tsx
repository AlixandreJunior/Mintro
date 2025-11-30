import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from '@/share/components/ProgressCircle';
import ShoeIcon from '@/share/components/icons/ShoeIcon';
import { buildDashboardSummary, PeriodMode } from '../utils/summary';

interface DashboardSummaryProps<T extends Record<string, any>> {
  logs: T[];
  mode: PeriodMode;
  goal: number;
  dateKey: keyof T;
  valueKey: keyof T;
  selectedDate: Date;
  icon?: React.ReactNode;
  color?: string;
  labelSuffix?: string;
}

export function DashboardSummary<T extends Record<string, any>>({
  logs,
  mode,
  goal,
  dateKey,
  valueKey,
  selectedDate,
  icon = <ShoeIcon />,
  color = '#A5D6A7',
  labelSuffix = '',
}: DashboardSummaryProps<T>) {
  const { value, progress, label } = useMemo(
    () =>
      buildDashboardSummary<T>({
        logs,
        mode,
        goal,
        dateKey,
        valueKey,
        selectedDate,
      }),
    [logs, mode, goal, dateKey, valueKey, selectedDate]
  );

  console.log(progress);

  return (
    <View style={styles.mainContent}>
      <View style={styles.leftContent}>
        <Text style={styles.currentAmount}>
          {value.toLocaleString('pt-BR')} {labelSuffix}
        </Text>

        <Text style={styles.remainingText}>{label}</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressCircle
          progress={progress}
          size={100}
          color={color}
          strokeWidth={8}
        />

        <View style={styles.progressIcon}>{icon}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  leftContent: {
    flex: 1,
    marginRight: 20,
  },
  currentAmount: {
    fontSize: 30,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
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
