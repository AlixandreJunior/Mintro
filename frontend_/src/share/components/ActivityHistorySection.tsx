import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ExerciseLog } from '../types/health/exercise';
import { MindfulnessLog } from '../types/health/mindfulness';
import {
  dayLabel,
  getDetails,
  getName,
  parseDate,
} from '../utils/activityHistoryHelpers';
import HealthCard from './HealthCard';
import CardActions from './CardActions';

interface Props {
  type: 'exercise' | 'mindfulness';
  logs: ExerciseLog[] | MindfulnessLog[];
  onEdit: (...args: any[]) => void;
  onDelete: (...args: any[]) => void;
}

export const ActivityHistorySection: React.FC<Props> = ({
  type,
  logs,
  onDelete,
  onEdit,
}) => {
  const isExercise = type === 'exercise';

  const isExerciseLog = (
    log: ExerciseLog | MindfulnessLog
  ): log is ExerciseLog => isExercise && 'distance' in log;

  const grouped: Record<string, (ExerciseLog | MindfulnessLog)[]> = {};

  logs.forEach((log) => {
    const date = parseDate(log);
    const key = format(date, 'yyyy-MM-dd');
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(log);
  });

  const sortedDays = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const renderCard = (log: ExerciseLog | MindfulnessLog) => (
    <HealthCard key={log.id}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{getName(log, isExercise)}</Text>
          <Text style={styles.details}>{getDetails(log, isExerciseLog)}</Text>
        </View>

        <CardActions
          onEdit={() => onEdit(log)}
          onDelete={() => onDelete(log.id)}
        />
      </View>
    </HealthCard>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Histórico</Text>

      {logs.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            {isExercise
              ? 'Nenhum exercício registrado'
              : 'Nenhuma sessão registrada'}
          </Text>
          <Text style={styles.emptySub}>
            {isExercise
              ? 'Adicione seu primeiro exercício'
              : 'Adicione sua primeira sessão'}
          </Text>
        </View>
      )}

      {sortedDays.map((dayKey) => (
        <View key={dayKey} style={{ marginBottom: 24 }}>
          <Text style={styles.date}>{dayLabel(new Date(dayKey))}</Text>
          {grouped[dayKey].map(renderCard)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#444',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
  },
  details: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },
  emptySub: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
});

export default ActivityHistorySection;
