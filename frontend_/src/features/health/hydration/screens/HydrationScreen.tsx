import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WaterDropIcon from '@/share/components/icons/WaterDropIcon';
import DashboardMainContent from '@/share/components/DashboardTemplate';
import { useHydration } from '../hooks/useHydration';
import { Hydration } from '@/share/types/health/hydratation';
import { FloatingActionButton } from '@/share/components/FloatingButtonAction';
import HydrationModal from '../components/HydrationModal';
import { router } from 'expo-router';

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

  const { handleHydrationList, handleHydrationDelete, handleHydrationUpdate } =
    useHydration();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Hydration | null>(null);

  const handleEdit = useCallback((log: Hydration) => {
    setSelectedLog(log);
    setModalVisible(true);
  }, []);

  const handleSaveModal = useCallback(
    async ({ quantity, date }: { quantity: number; date: Date }) => {
      if (!selectedLog) return;

      await handleHydrationUpdate(selectedLog.id, {
        quantity,
        date: date.toISOString(),
      });

      setModalVisible(false);
      setSelectedLog(null);
    },
    [selectedLog]
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions title="Hidratação" options={[]} />

      <DashboardMainContent<Hydration>
        periods={PERIODS as any}
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        loader={handleHydrationList}
        goal={10000}
        valueKey="quantity"
        dateKey="date"
        labelSuffix="ml"
        barColor="#415af7ff"
        icon={<WaterDropIcon size={24} color="#0022FF" />}
        dateLabel="De hoje"
        onDelete={handleHydrationDelete}
        onEdit={handleEdit} // Passa o callback para abrir modal
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default HydrationScreen;
