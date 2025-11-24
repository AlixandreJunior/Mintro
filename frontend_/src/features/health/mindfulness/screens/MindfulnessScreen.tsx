import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';

const MindfulnessScreen = () => {
  const title = 'Mindfulness';
  const type = 'mindfulness';

  const handlePress = () => {
    router.push('./mindfulness/register');
  };

  return (
    <ActivityScreenTemplate
      title={title}
      type={type}
      onAddPress={handlePress}
    />
  );
};

export default MindfulnessScreen;
