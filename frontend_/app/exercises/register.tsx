import React from 'react';
import { router } from 'expo-router';
import { getExerciseList } from '@/services/exercise/listExercise';
import { registerExerciseLog } from '@/services/exercise/registerExerciseLog';
import RegisterScreenTemplate from '@/components/RegisterScreenTemplate';

export default function RegisterExerciseScreen() {
  return (
    <RegisterScreenTemplate
      title="Registrar Exercício"
      labelSelect="Exercício"
      fetchItemList={getExerciseList}
      registerLog={registerExerciseLog}
      onSuccessRedirect={() => router.back()}
    />
  );
}
