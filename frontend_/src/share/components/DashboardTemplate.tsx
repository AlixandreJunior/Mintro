// DashboardTemplate.tsx
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useLoadList } from '@/share/hooks/useLoadList';
import PeriodDateHeader from '@/share/components/PeriodDateHeader';
import { DashboardSummary } from './DashboardSummary';
import { DashboardHistory } from './DashboardHistory';
import DashboardChart from './DashboardChart';
import { ResponseSuccess } from '../types/response';

const { height } = Dimensions.get('window');

interface DashboardMainContentProps<
  T extends Record<string, any>,
  P extends string = 'day' | 'week' | 'month' | 'year'
> {
  periods: { key: P; label: string }[];
  selectedPeriod: P;
  selectedDate: Date;

  setSelectedPeriod: React.Dispatch<React.SetStateAction<P>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;

  loader: (date: Date, period: P) => Promise<T[]>;

  goal: number;

  valueKey: keyof T;
  dateKey: keyof T;
  labelSuffix: string;

  barColor: string;
  icon: React.ReactNode;

  dateLabel: string;

  onEdit?: (log: T) => void;
  onDelete?: (id: number) => Promise<ResponseSuccess>;
}

export function DashboardMainContent<
  T extends Record<string, any>,
  P extends string = 'day' | 'week' | 'month' | 'year'
>({
  periods,
  selectedPeriod,
  selectedDate,
  setSelectedDate,
  setSelectedPeriod,
  loader,
  goal,
  valueKey,
  dateKey,
  labelSuffix,
  barColor,
  icon,
  dateLabel,
  onDelete,
  onEdit,
}: DashboardMainContentProps<T, P>) {
  const { data: logs } = useLoadList({
    loader: () => loader(selectedDate, selectedPeriod),
    deps: [selectedDate, selectedPeriod],
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <PeriodDateHeader
        periods={periods}
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
      />

      <DashboardSummary<T>
        logs={logs}
        selectedDate={selectedDate}
        mode={selectedPeriod as 'day' | 'week' | 'month' | 'year'} // ✨ cast
        goal={goal}
        valueKey={valueKey}
        dateKey={dateKey}
        labelSuffix={labelSuffix}
        icon={icon}
        color={barColor}
      />

      <DashboardChart<T>
        logs={logs}
        selectedPeriod={selectedPeriod as 'day' | 'week' | 'month' | 'year'}
        valueKey={valueKey}
        dateKey={dateKey}
        barColor={barColor}
      />

      <DashboardHistory<T>
        logs={logs}
        mode={selectedPeriod as 'day' | 'week' | 'month' | 'year'}
        selectedDate={selectedDate}
        dateLabel={dateLabel}
        valueKey={valueKey}
        dateKey={dateKey}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1, paddingBottom: height * 0.03 },
});

export default DashboardMainContent;
