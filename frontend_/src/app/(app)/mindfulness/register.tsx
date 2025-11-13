import React from 'react';
import { router } from 'expo-router';
import { getMindfulnessList } from '@/api/services/mindfulness/listMindfulness';
import { registerMindfulnessLog } from '@/api/services/mindfulness/registerMindfulnessLog';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';

export default function RegisterMindfulnessScreen() {
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
}
