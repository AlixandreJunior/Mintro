import { getMindfulnessList } from '@/services/mindfulness/listMindfulnessLog';
import ActivityScreenTemplate from '@/components/ActivityScreenTemplate';
import { router } from 'expo-router';

const MindfulnessScreen = () => {
  return (
    <ActivityScreenTemplate
      title="Mindfulness"
      type="mindfulness"
      fetchLogs={getMindfulnessList}
      onAddPress={() => router.push('/mindfulness/register')}
    />
  );
};

export default MindfulnessScreen;
