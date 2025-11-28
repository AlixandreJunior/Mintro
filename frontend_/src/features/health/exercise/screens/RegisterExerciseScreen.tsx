import { router } from 'expo-router';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';
import { useExercise } from '../hooks/useExercise';
import { useEffect, useState } from 'react';
import { Exercise } from '@/share/types/health/exercise';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import do toast

const RegisterExerciseScreen = () => {
  const { handleExerciseList, handleExerciseLogCreate } = useExercise();
  const { showToast } = useToast(); // 🔹 hook do toast

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const onPressBack = () => {
    router.push('/(app)/exercises');
  };

  // 🔹 wrapper para disparar o toast
  const handleSaveWithToast = async (payload: any) => {
    try {
      await handleExerciseLogCreate(payload);
      showToast('Exercício registrado com sucesso!', 'success');
      onPressBack(); // ← volta após criar
    } catch (err) {
      console.error(err);
      showToast('Erro ao registrar exercício', 'error');
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
      handleSaveItem={handleSaveWithToast} // 🔹 usa wrapper com toast
      onSuccessRedirect={onPressBack}
      onBackPress={onPressBack}
    />
  );
};

export default RegisterExerciseScreen;
