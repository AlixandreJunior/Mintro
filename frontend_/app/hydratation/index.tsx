import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import { HydrationHistory } from '@/components/HydrationHistory';
import { HydrationSummary } from '@/components/HydrationSummary';
import { formatDatetimeToISO } from '@/utils/formatDatetimeToISO';
import { useHydrationLogs } from '@/hooks/useHydratationLog';
import { FloatingActionButton } from '@/components/FloatingButtonAction';
import PeriodSelector from '@/components/PeriodSelector';
import StepsChart from '@/components/StepsChart'; // Gráfico reutilizado
import GoalModal from '@/components/GoalModal';

export default function HydrationScreen() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month' | 'year'
  >('day');

  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const { logs, goal, loading, error } = useHydrationLogs(selectedDate);

  const total = logs.reduce((sum, { quantity = 0 }) => sum + quantity, 0);

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  const transformLogsToChartData = () => {
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
  };

  const [editedGoal, setEditedGoal] = useState(goal.toString());
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleSaveGoal = (newGoal: number) => {
    // Atualize a meta aqui (exemplo: API ou estado global)
    // Exemplo:
    // updateHydrationGoal(newGoal);
    // Por enquanto, só fecha o modal
    setGoalModalVisible(false);
    // Você pode querer atualizar localmente o goal se precisar
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <HeaderWithOptions
        title="Hidratação"
        options={[
          {
            label: 'Editar Meta',
            onPress: () => {
              setEditedGoal(goal.toString());
              setGoalModalVisible(true);
            },
          },
        ]}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <PeriodSelector
          //@ts-ignore
          periods={periods}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

        <DateNavigator
          currentDate={selectedDate}
          mode={selectedPeriod}
          onDateChange={setSelectedDate}
        />

        <HydrationSummary
          total={total}
          remaining={goal - total}
          goal={goal}
          progress={(total / goal) * 100}
        />

        {selectedPeriod !== 'day' && (
          <StepsChart
            data={transformLogsToChartData()}
            mode={selectedPeriod}
            barColor="#4DC4FF"
          />
        )}

        <HydrationHistory
          logs={logs}
          dateLabel={formatDatetimeToISO(selectedDate)}
          loading={loading}
          error={error}
        />
      </ScrollView>

      <FloatingActionButton
        onPress={() => router.push('/hydratation/register')}
      />

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
        currentValue={goal}
        goalType="hydration"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    color: '#888',
    fontSize: 16,
  },
  save: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
