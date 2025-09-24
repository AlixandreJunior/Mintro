import React, { useMemo } from 'react';
import { View } from 'react-native';
import Chart from '@/components/StepsChart';
import { useHydration } from '@/hooks/useHydratationLog';

interface HydrationChartProps {
  selectedDate: Date;
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
}

const HydrationChart: React.FC<HydrationChartProps> = ({
  selectedDate,
  selectedPeriod,
}) => {
  const { logs, loading, error } = useHydration(selectedDate);

  const chartData = useMemo(() => {
    if (!logs) return [];

    switch (selectedPeriod) {
      case 'day':
        return Array.from({ length: 24 }, (_, hour) => {
          const total = logs
            .filter((log) => new Date(log.date).getHours() === hour)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: hour, y: total };
        });

      case 'week':
        return Array.from({ length: 7 }, (_, day) => {
          const total = logs
            .filter((log) => new Date(log.date).getDay() === day)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: day, y: total };
        });

      case 'month':
        return Array.from({ length: 30 }, (_, day) => {
          const total = logs
            .filter((log) => new Date(log.date).getDate() === day + 1)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: day + 1, y: total };
        });

      case 'year':
        return Array.from({ length: 12 }, (_, month) => {
          const total = logs
            .filter((log) => new Date(log.date).getMonth() === month)
            .reduce((sum, log) => sum + (log.quantity ?? 0), 0);
          return { x: month + 1, y: total };
        });

      default:
        return [];
    }
  }, [logs, selectedPeriod]);

  if (loading) return null;
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
