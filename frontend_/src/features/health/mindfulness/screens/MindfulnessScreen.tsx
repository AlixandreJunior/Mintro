import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';

const MindfulnessScreen = () => {
  const title = 'Atividade';
  const type = 'exercise';

  const handlePress = () => {
    router.push('./exercises/register');
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
