// src/templates/ActivityScreenTemplate.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { startOfWeek, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '@/src/components/Layout/Header';
import HeaderWithOptions from '@/src/components/Layout/HeaderWithOptions';
import DateNavigator from '@/src/components/DateNavigator';
import { SummarySection } from '@/src/components/SummarySection';
import { ActivityHistorySection } from '@/src/components/ActivityHistorySection';
import { WeekDaysContainer } from '@/src/components/WeekDaysContainer';
import PeriodSelector from './PeriodSelector';
import { FloatingActionButton } from './FloatingButtonAction';

import ActivityCalendar from './ActivityCalendar';

import GoalModal from '@/src/components/GoalModal'; // Importa o GoalModal

interface WeekDayDisplay {
  id: string;
  letter: string;
  date: Date;
  exercised: boolean;
}

interface ActivityScreenTemplateProps {
  title: string;
  type: 'exercise' | 'mindfulness';
  onAddPress: () => void;
  fetchLogs: (date: Date) => Promise<any[]>; // MindfulnessLog[] | ExerciseLog[]
}

function ActivityScreenTemplate({
  title,
  type,
  fetchLogs,
  onAddPress,
}: ActivityScreenTemplateProps) {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>(
    'week'
  );
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([]);
  const [fetchKey, setFetchKey] = useState<number>(0); // Força recarregamento

  // === Estado para modal ===
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  // Simulação das metas (aqui você deve pegar da API ou contexto global)
  // Pode ter um estado para cada tipo se quiser mais realismo
  const [exerciseGoal, setExerciseGoal] = useState(3); // Exemplo: 3 exercícios por semana
  const [mindfulnessGoal, setMindfulnessGoal] = useState(2); // Exemplo: 2 sessões mindfulness por semana

  const periods = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
  ];

  useEffect(() => {
    const loadLogs = async () => {
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, {
        weekStartsOn: 0,
        locale: ptBR,
      });

      setLoading(true);
      setError(null);

      try {
        // @ts-ignore
        const data = await fetchLogs(currentDisplayDate, selectedPeriod);

        if (selectedPeriod === 'week') {
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
              exercised: data.some((log) =>
                isSameDay(new Date(log.datetime), day)
              ),
            })
          );

          setWeekDaysDisplay(weekDaysData);
        }

        setLogs(data);
      } catch (err: any) {
        setError(err.message || `Erro ao carregar registros de ${type}.`);
        console.error(`Error loading ${type} logs:`, err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [currentDisplayDate, selectedPeriod, fetchKey, fetchLogs, type]);

  const completedDays = weekDaysDisplay.filter((d) => d.exercised).length;
  const totalLogs = logs.length;

  const handleBack = () => router.back();

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
    setFetchKey((prev) => prev + 1);
  };

  // === Handler para salvar meta do modal ===
  const handleSaveGoal = (newGoal: number) => {
    if (type === 'exercise') setExerciseGoal(newGoal);
    else if (type === 'mindfulness') setMindfulnessGoal(newGoal);
    setGoalModalVisible(false);
    // Aqui poderia fazer update via API também
  };

  // Qual meta mostrar no modal, dependendo do tipo
  const currentGoal = type === 'exercise' ? exerciseGoal : mindfulnessGoal;

  const markedDates = logs.map((log) => new Date(log.datetime));

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title={title}
        onBackPress={handleBack}
        options={[
          {
            label: 'Editar Meta',
            onPress: () => setGoalModalVisible(true),
          },
          { label: 'Excluir', onPress: () => console.log('Excluir') },
        ]}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <PeriodSelector
          // @ts-ignore
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

      <FloatingActionButton onPress={onAddPress} />

      {/* Modal de edição da meta */}
      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
        currentValue={currentGoal}
        goalType={type === 'exercise' ? 'exercise' : 'mindfulness'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
});

export default ActivityScreenTemplate;
