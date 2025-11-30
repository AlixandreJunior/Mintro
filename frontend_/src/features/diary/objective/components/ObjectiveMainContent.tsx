import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Objective } from '@/share/types/mental/objectives';
import ObjectiveDisplayCard from './ObjectiveCard';
import ObjectiveProgressCard from './ObjectiveProgressCard';
import ObjectiveStreakSection from './ObjectiveStreakSection';
import ObjectiveCalendarSection from './ObjectiveCalendarSection';
import ObjectiveRateSection from './ObjectiveRateSection';
import ObjectiveConclusionSection from './ObjectiveConclusionSection';
import ObjectiveFooter from './ObjectiveFooter';

const { height } = Dimensions.get('window');

interface ObjectiveMainContentProps {
  objective: Objective | null;
}

export const ObjectiveMainContent: React.FC<ObjectiveMainContentProps> = ({
  objective,
}) => {
  if (objective == null) {
    return null;
  }
  return (
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
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
});
