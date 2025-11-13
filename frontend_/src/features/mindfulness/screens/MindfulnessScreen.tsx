import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';

const MindfulnessScreen = () => {
  return (
    <ActivityScreenTemplate
      title="Mindfulness"
      type="mindfulness"
      onAddPress={() => router.push('/mindfulness/register')}
    />
  );
};

export default MindfulnessScreen;
