import React, { useMemo } from 'react';
import { View } from 'react-native';
import Chart from '../../step/components/StepsChart';
import { Hydration } from '@/share/types/health/hydratation';

interface HydrationChartProps {
  logs: Hydration[];
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
}

const HydrationChart: React.FC<HydrationChartProps> = ({
  logs,
  selectedPeriod,
}) => {
  const periodConfig = {
    day: {
      length: 24,
      getIndex: (d: Date) => d.getHours(),
    },
    week: {
      length: 7,
      getIndex: (d: Date) => d.getDay(),
    },
    month: {
      length: 31,
      getIndex: (d: Date) => d.getDate() - 1,
    },
    year: {
      length: 12,
      getIndex: (d: Date) => d.getMonth(),
    },
  } as const;

  const chartData = useMemo(() => {
    const config = periodConfig[selectedPeriod];
    if (!config) return [];

    const buckets = Array.from({ length: config.length }, () => 0);

    logs.forEach((log) => {
      const date = new Date(log.date);
      const index = config.getIndex(date);

      if (index >= 0 && index < buckets.length) {
        buckets[index] += log.quantity ?? 0;
      }
    });

    return buckets.map((y, i) => ({
      x: i + 1,
      y,
    }));
  }, [logs, selectedPeriod]);

  return (
    <View>
      <Chart
        key={logs.length + selectedPeriod}
        data={chartData}
        mode={selectedPeriod}
        barColor="#4DC4FF"
      />
    </View>
  );
};

export default HydrationChart;
