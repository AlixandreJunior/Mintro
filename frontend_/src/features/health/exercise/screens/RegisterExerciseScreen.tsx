import { router } from 'expo-router';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';
import { useExercise } from '../hooks/useExercise';
import { useEffect, useState } from 'react';
import { Exercise } from '@/share/types/health/exercise';
import { useToast } from '@/share/providers/ToastProvider';

const RegisterExerciseScreen = () => {
  const { handleExerciseList, handleExerciseLogCreate, error } = useExercise();
  const { showToast } = useToast();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const onPressBack = () => {
    router.push('/(app)/exercises');
  };

  console.log(error);

  const handleSave = async (payload: any) => {
    try {
      const result = await handleExerciseLogCreate(payload);
      showToast('Exercício registrado com sucesso!', 'success');
      router.push('/(app)/(tabs)/activity');
    } catch (err) {
      showToast('Falha ao registrar o exercício!', 'error');
    }
  };

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
      handleSaveItem={handleSave}
      onSuccessRedirect={onPressBack}
      onBackPress={onPressBack}
      error={error}
    />
  );
};

export default RegisterExerciseScreen;
