import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import ObjectiveProgressCard from '@/components/ObjectiveProgressCard';
import ObjectiveStreakSection from '@/components/ObjectiveStreakSection';
import ObjectiveRateSection from '@/components/ObjectiveRateSection';
import ObjectiveConclusionSection from '@/components/ObjectiveConclusionSection';
import ObjectiveCalendarSection from '@/components/ObjectiveCalendarSection';
import ObjectiveDisplayCard from '@/components/Cards/ObjectiveCard';
import { useObjective } from '@/hooks/useObjective';
import { Objective } from '@/types/mental/objectives';

import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm';
import ObjectiveFooter from '@/components/ObjectiveFooter';
import ObjectiveModals from '@/components/ObjectiveModals';

const { height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const { handleDelete, handleGetObjective } = useObjective();

  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [visibleModal, setVisibleModal] = useState<null | 'reminder' | 'repeat'>(null);

  const {
    selectedRepeat,
    setSelectedRepeat,
    reminderTime,
    setReminderTime,
    setRemindersEnabled,
    handleUpdate,
  } = useObjectiveForm();

  useEffect(() => {
    const fetchObjective = async () => {
      try {
        if (!id) return;
        const data = await handleGetObjective(Number(id));
        setObjective(data);

        setSelectedRepeat(data.repeat);
        if (data.reminder) {
          setReminderTime(data.reminder);
          setRemindersEnabled(true);
        }
      } catch (error) {
        console.error('Erro ao buscar objetivo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjective();
  }, [id, setSelectedRepeat, setReminderTime, setRemindersEnabled]);

  const handleModalChange = async (type: 'reminder' | 'repeat', value: string | null) => {
    if (!id || !value) return;
    setUpdating(true);
    try {
      if (type === 'reminder') {
        setReminderTime(value);
        setRemindersEnabled(true);
        setObjective((prev) => (prev ? { ...prev, reminder: value } : prev));
      } else if (type === 'repeat') {
        //@ts-ignore
        setSelectedRepeat(value);
        setObjective((prev) => (prev ? { ...prev, repeat: value } : prev));
      }

      await handleUpdate(Number(id));
    } catch (error) {
      console.error('Erro ao atualizar objetivo:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (!objective) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>Objetivo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Detalhes de Objetivo"
        options={[
          { label: 'Repetir', onPress: () => setVisibleModal('repeat') },
          { label: 'Lembretes', onPress: () => setVisibleModal('reminder') },
          { label: 'Excluir', onPress: () => handleDelete(Number(id)) },
        ]}
        onBackPress={() => router.replace('/(tabs)/mental')}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ObjectiveDisplayCard
          objectiveTitle={objective.activity.name}
          objectiveSubtitle={
            new Date(objective.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }) || 'Sem descrição'
          }
        />
        <ObjectiveProgressCard
          current={objective.week_count}
          total={parseInt(objective.repeat)}
        />
        <ObjectiveStreakSection current={objective.streak} longest={objective.best_streak} />
        <ObjectiveCalendarSection diary_dates={objective.diary_dates} />
        <ObjectiveRateSection
          repeat={parseInt(objective.repeat)}
          week_count={objective.week_count}
          success_rate_avarege={objective.success_rate_average}
        />
        <ObjectiveConclusionSection thisMonth={objective.conclusion_count} total={objective.conclusion_count} />

        <ObjectiveFooter createdAt={objective.created_at} />
      </ScrollView>

      <ObjectiveModals
        visibleModal={visibleModal}
        reminder={reminderTime}
        repeat={selectedRepeat}
        updating={updating}
        onChange={handleModalChange}
        onClose={() => setVisibleModal(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
