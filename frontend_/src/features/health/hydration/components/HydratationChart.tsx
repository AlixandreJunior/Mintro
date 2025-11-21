import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Chart from '../../step/components/StepsChart';
import { useHydration } from '../hooks/useHydration';
import { Hydration } from '@/share/types/health/hydratation';

interface HydrationChartProps {
  selectedDate: Date;
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
}

const HydrationChart: React.FC<HydrationChartProps> = ({
  selectedDate,
  selectedPeriod,
}) => {
  const [logs, setLogs] = useState<Hydration[]>([]);
  const { handleHydrationList, error } = useHydration();

  useEffect(() => {
    const load = async () => {
      const data = await handleHydrationList(selectedDate);
      setLogs(data);
    };
    load();
  }, [selectedDate]);

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
      length: 30,
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

      if (index >= 0 && index < config.length) {
        buckets[index] += log.quantity ?? 0;
      }
    });

    return buckets.map((y, i) => ({
      x: selectedPeriod === 'day' ? i : i + 1,
      y,
    }));
  }, [logs, selectedPeriod]);

  if (error) return null;

  return (
    <View>
      {selectedPeriod !== 'day' && (
        <Chart data={chartData} mode={selectedPeriod} barColor="#4DC4FF" />
      )}
    </View>
  );
};

export default HydrationChart;
