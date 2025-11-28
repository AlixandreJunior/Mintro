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
  } = useHydration();

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
      showToast('Hidratação deletada com sucesso!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Erro ao deletar hidratação', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        onBackPress={() => router.push('/(app)/(tabs)/activity')}
        title="Hidratação"
        options={[]}
      />

      <DashboardMainContent<Hydration>
        periods={PERIODS as any}
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        loader={handleHydrationList}
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
          onSave={handleSaveModal} // 🔹 toast no update
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default HydrationScreen;
