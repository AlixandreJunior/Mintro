import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ExerciseLog } from '../types/health/exercise';
import { MindfulnessLog } from '../types/health/mindfulness';

interface Props {
  type: 'exercise' | 'mindfulness';
  logs: ExerciseLog[] | MindfulnessLog[];
}

export const ActivityHistorySection: React.FC<Props> = ({ type, logs }) => {
  const isExercise = type === 'exercise';

  // --- AUX ------------------------------------------------------------

  const getName = (log: any) =>
    isExercise
      ? log.exercise?.name || log.description || 'Exercício'
      : log.mindfulness?.name || log.description || 'Mindfulness';

  const getExerciseDetails = (log: ExerciseLog) => {
    const distance = log.distance ? `${log.distance}km` : '';
    const duration = log.duration ? `${log.duration}min` : '';
    return distance && duration
      ? `${distance} - ${duration}`
      : distance || duration || '';
  };

  const buildKey = (log: any) =>
    log.id ?? `${log.datetime}-${log.duration}-${getName(log)}`;

  const parseDate = (log: any) =>
    log.datetime ? new Date(log.datetime) : new Date(log.date);

  // --- AGRUPAMENTO ----------------------------------------------------

  const grouped = logs.reduce((acc: any, log: any) => {
    const date = parseDate(log);
    const dayKey = format(date, 'yyyy-MM-dd');

    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(log);

    return acc;
  }, {});

  const sortedDays = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // --- RENDER ---------------------------------------------------------

  const renderCard = (log: any) => (
    <View key={buildKey(log)} style={styles.historyCard}>
      <View style={styles.historyCardContent}>
        <View>
          <Text style={styles.exerciseType}>{getName(log)}</Text>

          {isExercise && (
            <Text style={styles.exerciseDetails}>
              {getExerciseDetails(log as ExerciseLog)}
            </Text>
          )}
        </View>

        {!isExercise && (
          <Text style={styles.exerciseCount}>{log.duration || 0} min</Text>
        )}
      </View>
    </View>
  );

  const renderDayTitle = (dateString: string) => {
    const date = new Date(dateString);

    if (isToday(date)) return 'Hoje';
    if (isYesterday(date)) return 'Ontem';

    return format(date, "dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <View style={styles.historySection}>
      <Text style={styles.historyTitle}>Histórico</Text>

      {logs.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            {isExercise
              ? 'Nenhum exercício registrado'
              : 'Nenhuma sessão registrada'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {isExercise
              ? 'Adicione seu primeiro exercício'
              : 'Adicione sua primeira sessão'}
          </Text>
        </View>
      )}

      {sortedDays.map((dayKey) => {
        const logList = grouped[dayKey];

        return (
          <View key={dayKey} style={{ marginBottom: 24 }}>
            <Text style={styles.historyDate}>{renderDayTitle(dayKey)}</Text>

            {logList.map(renderCard)}
          </View>
        );
      })}
    </View>
  );
};

// --------------------------------------------------------------

const styles = StyleSheet.create({
  historySection: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#444',
    marginBottom: 12,
    marginTop: 12,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  historyCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseType: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  exerciseCount: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666',
  },

  // --- Empty state centralizado ---
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
});

export default ActivityHistorySection;
