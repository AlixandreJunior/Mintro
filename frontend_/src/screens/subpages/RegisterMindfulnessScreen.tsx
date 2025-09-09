import React from 'react';
import { router } from 'expo-router';
import { getMindfulnessList } from '@/services/mindfulness/listMindfulness';
import { registerMindfulnessLog } from '@/services/mindfulness/registerMindfulnessLog';
import RegisterScreenTemplate from '@/components/RegisterScreenTemplate';

const RegisterMindfulnessScreen = () => {
  return (
    <RegisterScreenTemplate
      title="Registrar Mindfulness"
      labelSelect="Mindfulness"
      fetchItemList={getMindfulnessList}
      registerLog={registerMindfulnessLog}
      initialDuration="15"
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterMindfulnessScreen;
