import { router } from 'expo-router';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';
import { useExercise } from '../hooks/useExercise';
import { useEffect, useState } from 'react';
import { Exercise } from '@/share/types/health/exercise';

const RegisterExerciseScreen = () => {
  const { handleExerciseList, handleExerciseLogCreate } = useExercise();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await handleExerciseList();
      setExercises(data);
    };
    load();
  }, []);

  return (
    <RegisterScreenTemplate
      title="Registrar Exercício"
      labelSelect="Exercise_id"
      items={exercises}
      handleSaveItem={handleExerciseLogCreate}
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterExerciseScreen;
