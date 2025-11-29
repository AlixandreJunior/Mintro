import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Step } from '@/share/types/health/steps';
import ShoeIcon from '@/share/components/icons/ShoeIcon';
import DashboardMainContent from '@/share/components/DashboardTemplate';
import { useSteps } from '../hooks/useSteps';
import { router } from 'expo-router';
import { useLoadList } from '@/share/hooks/useLoadList';
import { useToast } from '@/share/providers/ToastProvider';
import StepsGoalModal from '../components/StepGoalModal';

const PERIODS = [
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mês' },
  { key: 'year', label: 'Ano' },
] as const;

type Period = (typeof PERIODS)[number]['key'];

const StepsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const [stepGoal, setStepGoal] = useState<number | null>(null);

  const { data: logs } = useLoadList({
    loader: () => handleStepsList(selectedDate, selectedPeriod),
    deps: [selectedDate, selectedPeriod],
  });

  const { handleStepsList, handleStepGoal, handleStepUpdateGoal } = useSteps();

  const { showToast } = useToast();

  useEffect(() => {
    const loadGoal = async () => {
      try {
        const data = await handleStepGoal();
        if (data?.goal) {
          setStepGoal(data.goal);
        }
      } catch (error) {
        console.log('Erro ao carregar meta de passos', error);
        showToast('Erro ao carregar meta de passos', 'error');
      }
    };

    loadGoal();
  }, []);

  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleSaveGoal = async (newGoal: number) => {
    try {
      await handleStepUpdateGoal(newGoal);
      setStepGoal(newGoal);
      setGoalModalVisible(false);
      showToast('Meta de passos atualizada!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Erro ao atualizar meta', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        title="Passos"
        options={[
          {
            label: 'Meta',
            onPress: () => setGoalModalVisible(true),
          },
        ]}
        onBackPress={() => router.push('/(app)/(tabs)/activity')}
      />

      <DashboardMainContent<Step, Period>
        logs={logs}
        periods={PERIODS as any}
        selectedPeriod={selectedPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        goal={stepGoal ?? 0}
        valueKey="steps"
        dateKey="date"
        labelSuffix="passos"
        barColor="#A5D6A7"
        icon={<ShoeIcon />}
        dateLabel="De hoje"
        un="passos"
      />

      <StepsGoalModal
        visible={goalModalVisible}
        currentGoal={stepGoal}
        onClose={() => setGoalModalVisible(false)}
        onSave={handleSaveGoal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default StepsScreen;
