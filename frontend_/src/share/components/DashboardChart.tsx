import React, { useMemo } from 'react';
import { View } from 'react-native';
import { aggregateLogsByPeriod } from '@/share/utils/aggregateLogsByPeriod';
import Chart from '@/share/components/Chart';

interface DashboardChartProps<T extends Record<string, any>> {
  logs: T[];
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
  dateKey: keyof T;
  valueKey: keyof T;
  barColor?: string;
}

function DashboardChart<T extends Record<string, any>>({
  logs,
  selectedPeriod,
  dateKey,
  valueKey,
  barColor = '#4DC4FF',
}: DashboardChartProps<T>) {
  const chartData = useMemo(
    () =>
      aggregateLogsByPeriod<T>({
        logs,
        period: selectedPeriod,
        getValue: (log) => Number(log[valueKey]),
        getDate: (log) => new Date(log[dateKey]),
      }),
    [logs, selectedPeriod, dateKey, valueKey]
  );

  return (
    <View>
      <Chart
        key={logs.length + selectedPeriod}
        data={chartData}
        mode={selectedPeriod}
        barColor={barColor}
      />
    </View>
  );
}

export default DashboardChart;
