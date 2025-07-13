import { MindfulnessLog } from '@/types/health/mindfulness';
import { getMindfulnessList } from '@/services/mindfulness/listMindfulnessLog';
import ActivityScreenTemplate from '@/components/ActivityScreenTemplate';
import { router } from 'expo-router';

export default function MindfulnessActivityScreen() {
  return (
    <ActivityScreenTemplate
      title="Mindfulness"
      type="mindfulness"
      fetchLogs={getMindfulnessList}
      onAddPress={() => router.push('/mindfulness/register')}
    />
  );
}