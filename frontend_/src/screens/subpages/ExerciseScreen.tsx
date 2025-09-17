import { getExerciseLogs } from '@/services/exercise/listExerciseLog';
import ActivityScreenTemplate from '@/components/ActivityScreenTemplate';
import { router } from 'expo-router';

const ExerciseScreen = () => {
  return (
    <ActivityScreenTemplate
      title="Atividade"
      type="exercise"
      fetchLogs={getExerciseLogs}
      onAddPress={() => router.push('./exercises/register')}
    />
  );
};

export default ExerciseScreen;
