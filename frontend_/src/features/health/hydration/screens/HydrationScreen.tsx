import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WaterDropIcon from '@/share/components/icons/WaterDropIcon';
import DashboardMainContent from '@/share/components/DashboardTemplate';
import { useHydration } from '../hooks/useHydration';
import { Hydration } from '@/share/types/health/hydratation';
import { FloatingActionButton } from '@/share/components/FloatingButtonAction';
import HydrationModal from '../components/HydrationModal';
import { router } from 'expo-router';
import { useToast } from '@/share/providers/ToastProvider';
import { useLoadList } from '@/share/hooks/useLoadList';
import HydrationGoalModal from '../components/HydrationGoalModal';

const PERIODS = [
  { key: 'day', label: 'Dia' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
  { key: 'year', label: 'Ano' },
] as const;

type Period = (typeof PERIODS)[number]['key'];

const HydrationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const {
    handleHydrationList,
    handleHydrationDelete,
    handleHydrationUpdate,
    handleHydrationGoal,
    handleHydrationUpdateGoal,
  } = useHydration();

  const { data: logs, reload } = useLoadList({
    loader: () => handleHydrationList(selectedDate, selectedPeriod),
    deps: [selectedDate, selectedPeriod],
  });

  const { showToast } = useToast();

  const [hydrationGoal, setHydrationGoal] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Hydration | null>(null);

  useEffect(() => {
    const loadGoal = async () => {
      try {
        const data = await handleHydrationGoal();
        if (data?.goal) {
          setHydrationGoal(data.goal);
        }
      } catch (error) {
        console.log('Erro ao carregar meta de hidratação', error);
        showToast('Erro ao carregar meta de hidratação', 'error');
      }
    };

    loadGoal();
  }, []);

  const handleEdit = useCallback((log: Hydration) => {
    setSelectedLog(log);
    setModalVisible(true);
  }, []);

  const handleSaveModal = useCallback(
    async ({ quantity, date }: { quantity: number; date: Date }) => {
      if (!selectedLog) return;

      try {
        await handleHydrationUpdate(selectedLog.id, {
          quantity,
          date: date.toISOString(),
        });

        reload();

        setModalVisible(false);
        setSelectedLog(null);
        showToast('Hidratação atualizada com sucesso!', 'success');
      } catch (error) {
        console.error(error);
        showToast('Erro ao atualizar hidratação', 'error');
      }
    },
    [selectedLog]
  );

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await handleHydrationDelete(id);

      reload();

      showToast('Hidratação deletada com sucesso!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Erro ao deletar hidratação', 'error');
    }
  };

  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleSaveGoal = async (newGoal: number) => {
    try {
      await handleHydrationUpdateGoal(newGoal);
      setHydrationGoal(newGoal);
      setGoalModalVisible(false);
      showToast('Meta de hidratação atualizada!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Erro ao atualizar meta', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        onBackPress={() => router.push('/(app)/(tabs)/activity')}
        title="Hidratação"
        options={[
          {
            label: 'Meta',
            onPress: () => setGoalModalVisible(true),
          },
        ]}
      />

      <DashboardMainContent<Hydration>
        logs={logs}
        periods={PERIODS as any}
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        goal={hydrationGoal ?? 0}
        valueKey="quantity"
        dateKey="date"
        labelSuffix="ml"
        barColor="#415af7ff"
        icon={<WaterDropIcon size={24} color="#0022FF" />}
        dateLabel="De hoje"
        onDelete={handleDelete}
        onEdit={handleEdit}
        un="ml"
      />

      <FloatingActionButton
        onPress={() => router.push('/hydratation/register')}
      />

      {selectedLog && (
        <HydrationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          initialDate={new Date(selectedLog.date)}
          initialQuantity={selectedLog.quantity}
          onSave={handleSaveModal}
        />
      )}

      <HydrationGoalModal
        visible={goalModalVisible}
        currentGoal={hydrationGoal}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default HydrationScreen;
