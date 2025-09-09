import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import Header from '@/components/layout/Header';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import ObjectiveProgressCard from '@/components/ObjectiveProgressCard';
import ObjectiveStreakSection from '@/components/ObjectiveStreakSection';
import ObjectiveRateSection from '@/components/ObjectiveRateSection';
import ObjectiveConclusionSection from '@/components/ObjectiveConclusionSection';
import ObjectiveCalendarSection from '@/components/ObjectiveCalendarSection';
import ObjectiveDisplayCard from '@/components/specific/ObjectiveCard';
import { useObjective } from '@/hooks/useObjective';

import ObjectiveFooter from '@/components/ObjectiveFooter';
import ObjectiveModals from '@/components/ObjectiveModals';
import { useObjectiveDetail } from '@/hooks/useObjectiveDetail';

const { height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const { handleDelete } = useObjective();

  const {
    closeModals,
    reminderTime,
    selectedRepeat,
    handleModalChange,
    isReminderModalVisible,
    isRepeatModalVisible,
    setReminderModalVisible,
    setRepeatModalVisible,
    updating,
    objective,
    loading,
  } = useObjectiveDetail(Number(id));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 32 }}
        />
      </SafeAreaView>
    );
  }

  if (!objective) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>
          Objetivo não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Detalhes de Objetivo"
        options={[
          { label: 'Repetir', onPress: () => setRepeatModalVisible(true) },
          { label: 'Lembretes', onPress: () => setReminderModalVisible(true) },
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
        <ObjectiveStreakSection
          current={objective.streak}
          longest={objective.best_streak}
        />
        <ObjectiveCalendarSection diary_dates={objective.diary_dates} />
        <ObjectiveRateSection
          repeat={parseInt(objective.repeat)}
          week_count={objective.week_count}
          success_rate_avarege={objective.success_rate_average}
        />
        <ObjectiveConclusionSection
          thisMonth={objective.conclusion_count}
          total={objective.conclusion_count}
        />
        <ObjectiveFooter createdAt={objective.created_at} />
      </ScrollView>

      <ObjectiveModals
        visibleModal={
          isReminderModalVisible
            ? 'reminder'
            : isRepeatModalVisible
            ? 'repeat'
            : null
        }
        reminder={reminderTime}
        repeat={selectedRepeat?.replace('x', '')}
        updating={updating}
        onChange={handleModalChange}
        onClose={closeModals}
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
    paddingVertical: height * 0.02,
  },
});
