import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  completedDays: number; // dias que ele completou
  totalExercises: number; // número total de registros
  activityType: 'exercise' | 'mindfulness';
  period: 'week' | 'month'; // novo
  currentDate: Date; // para calcular dias do mês
}

export const SummarySection: React.FC<Props> = ({
  completedDays,
  totalExercises,
  activityType,
  period,
  currentDate,
}) => {
  const totalDays =
    period === 'week'
      ? 7
      : new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();

  return (
    <View style={styles.summarySection}>
      <View style={styles.summaryContent}>
        <Text style={styles.summaryMain}>
          {completedDays} de {totalDays}
        </Text>

        <Text style={styles.summarySubtitle}>
          dias com {activityType === 'exercise' ? 'exercícios' : 'mindfulness'}
        </Text>
      </View>

      <Text style={styles.summaryDescription}>
        Você {activityType === 'exercise' ? 'se exercitou' : 'fez mindfulness'}{' '}
        um total de {totalExercises} vez{totalExercises !== 1 ? 'es' : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summarySection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  summaryMain: {
    fontSize: 32,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginRight: 8,
  },
  summarySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  summaryDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    lineHeight: 20,
  },
});
