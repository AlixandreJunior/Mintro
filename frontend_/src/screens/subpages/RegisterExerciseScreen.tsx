import { router } from 'expo-router';
import RegisterScreenTemplate from '@/components/RegisterScreenTemplate';
import { useExerciseLogs } from '@/hooks/useExerciseLogs';

const RegisterExerciseScreen = () => {
  const { exercises, saving, handleSaveExercise } = useExerciseLogs(new Date());

  return (
    <RegisterScreenTemplate
      title="Registrar Exercício"
      labelSelect="Exercise"
      items={exercises}
      saving={saving}
      //@ts-ignore
      handleSaveItem={handleSaveExercise}
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterExerciseScreen;
