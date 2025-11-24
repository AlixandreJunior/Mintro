import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import DateNavigator from '@/share/components/DateNavigator';
import { SummarySection } from '@/share/components/SummarySection';
import { ActivityHistorySection } from '@/share/components/ActivityHistorySection';
import { WeekDaysContainer } from '@/share/components/WeekDaysContainer';
import PeriodSelector from './PeriodSelector';
import ActivityCalendar from './ActivityCalendar';

import { useExercise } from '@/features/health/exercise/hooks/useExercise';
import { useMindfulness } from '@/features/health/mindfulness/hooks/useMindfulness';

import { useActivityLogs } from '../hooks/useActivityLogs';
import { buildWeekDaysDisplay } from '../utils/buildWeekDaysDisplay';

interface WeekDayDisplay {
  id: string;
  letter: string;
  date: Date;
  exercised: boolean;
}

interface ActivityMainContentProps {
  type: 'exercise' | 'mindfulness';
}

const periods = [
  { key: 'week' as const, label: 'Semana' },
  { key: 'month' as const, label: 'Mês' },
];

export default function ActivityMainContent({
  type,
}: ActivityMainContentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>(
    'week'
  );
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([]);

  const hook = type === 'exercise' ? useExercise() : useMindfulness();
  const { logs, loadLogs } = useActivityLogs(type, hook);

  useEffect(() => {
    loadLogs(currentDate, selectedPeriod);
  }, [currentDate, selectedPeriod]);

  useEffect(() => {
    if (selectedPeriod === 'week') {
      setWeekDaysDisplay(buildWeekDaysDisplay(currentDate, logs));
    } else {
      setWeekDaysDisplay([]);
    }
  }, [logs, currentDate, selectedPeriod]);

  // ----------------------------------------------------------
  // 🔥 Correção da contagem de dias completados no MÊS
  // ----------------------------------------------------------
  const completedDays =
    selectedPeriod === 'week'
      ? weekDaysDisplay.filter((d) => d.exercised).length
      : new Set(
          logs.map((l) => {
            const d = new Date(l.datetime);
            return d.toDateString(); // garante unicidade por dia
          })
        ).size;
  // ----------------------------------------------------------

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <PeriodSelector
        periods={periods}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <DateNavigator
        currentDate={currentDate}
        mode={selectedPeriod}
        onDateChange={setCurrentDate}
      />

      <SummarySection
        activityType={type}
        completedDays={completedDays}
        totalExercises={logs.length}
        period={selectedPeriod}
        currentDate={currentDate}
      />

      {selectedPeriod === 'week' && (
        <WeekDaysContainer weekDaysDisplay={weekDaysDisplay} />
      )}

      {selectedPeriod === 'month' && (
        <ActivityCalendar
          markedDates={logs.map((l) => new Date(l.datetime))}
          currentDate={currentDate}
        />
      )}

      <ActivityHistorySection type={type} logs={logs} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#fff' },
});
