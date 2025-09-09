import { router } from 'expo-router';
import { getExerciseList } from '@/services/exercise/listExercise';
import { registerExerciseLog } from '@/services/exercise/registerExerciseLog';
import RegisterScreenTemplate from '@/components/RegisterScreenTemplate';

const RegisterExerciseScreen = () => {
  return (
    <RegisterScreenTemplate
      title="Registrar Exercício"
      labelSelect="Exercise"
      fetchItemList={getExerciseList}
      registerLog={registerExerciseLog}
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterExerciseScreen;
