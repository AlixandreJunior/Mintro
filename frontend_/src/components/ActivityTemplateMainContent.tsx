import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import HeaderWithOptions from './layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import { SummarySection } from '@/components/SummarySection';
import { ActivityHistorySection } from '@/components/ActivityHistorySection';
import { WeekDaysContainer } from '@/components/WeekDaysContainer';
import PeriodSelector from './PeriodSelector';
import { FloatingActionButton } from './FloatingButtonAction';
import ActivityCalendar from './ActivityCalendar';

import { useExerciseLogs } from '@/hooks/useExerciseLogs';
import { useMindfulnessLogs } from '@/hooks/useMindfulnessLog';
import { MindfulnessLog } from '@/types/health/mindfulness';
import { ExerciseLog } from '@/types/health/exercise';

interface WeekDayDisplay {
  id: string;
  letter: string;
  date: Date;
  exercised: boolean;
}

interface ActivityMainContentProps {
  type: 'exercise' | 'mindfulness';
}

function ActivityMainContent({ type }: ActivityMainContentProps) {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>(
    'week'
  );
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([]);
  const error = null;
  const { logs, loading } =
    type === 'exercise'
      ? useExerciseLogs(currentDisplayDate, selectedPeriod)
      : useMindfulnessLogs(currentDisplayDate, selectedPeriod);

  useEffect(() => {
    if (selectedPeriod === 'week' && logs.length) {
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, {
        weekStartsOn: 0,
        locale: ptBR,
      });

      const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
        const day = new Date(startOfCurrentWeek);
        day.setDate(startOfCurrentWeek.getDate() + i);
        return day;
      });

      const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

      const weekDaysData: WeekDayDisplay[] = currentWeekDays.map(
        (day, index) => ({
          id: daysOfWeek[index],
          letter: daysOfWeek[index],
          date: day,
          exercised: logs.some((log) => isSameDay(new Date(log.datetime), day)),
        })
      );

      setWeekDaysDisplay(weekDaysData);
    } else {
      setWeekDaysDisplay([]);
    }
  }, [logs, currentDisplayDate, selectedPeriod]);

  const completedDays = weekDaysDisplay.filter((d) => d.exercised).length;
  const totalLogs = logs.length;

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  const markedDates = logs.map((log) => new Date(log.datetime));

  const periods: { key: 'week' | 'month'; label: string }[] = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <PeriodSelector
        periods={periods}
        selectedPeriod={selectedPeriod}
        // @ts-ignore
        onPeriodChange={handlePeriodChange}
      />

      <DateNavigator
        currentDate={currentDisplayDate}
        mode={selectedPeriod}
        onDateChange={setCurrentDisplayDate}
      />

      <SummarySection
        activityType={type}
        completedDays={completedDays}
        totalExercises={totalLogs}
      />

      {selectedPeriod === 'week' && (
        <WeekDaysContainer weekDaysDisplay={weekDaysDisplay} />
      )}

      {selectedPeriod === 'month' && (
        <ActivityCalendar
          markedDates={markedDates}
          currentDate={currentDisplayDate}
        />
      )}

      <ActivityHistorySection
        type={type}
        loading={loading}
        logs={logs}
        error={error}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
});

export default ActivityMainContent;
