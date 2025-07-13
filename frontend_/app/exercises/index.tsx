import { ExerciseLog } from '@/types/health/exercise';
import { getExerciseLogs } from '@/services/exercise/listExerciseLog';
import ActivityScreenTemplate from '@/components/ActivityScreenTemplate';
import { router } from 'expo-router';

export default function ExerciseActivityScreen() {
  return (
    <ActivityScreenTemplate
      title="Atividade"
      type="exercise"
      fetchLogs={getExerciseLogs}
      onAddPress={() => router.push('/exercises/register')}
    />
  );
}
