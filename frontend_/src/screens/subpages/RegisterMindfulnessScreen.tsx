import React from 'react';
import { router } from 'expo-router';
import RegisterScreenTemplate from '@/components/RegisterScreenTemplate';
import { useMindfulnessLogs } from '@/hooks/useMindfulnessLog';

const RegisterMindfulnessScreen = () => {
  const { mindfulnessList, saving, handleSaveMindfulness } = useMindfulnessLogs(
    new Date()
  );

  return (
    <RegisterScreenTemplate
      title="Registrar Mindfulness"
      labelSelect="Mindfulness"
      items={mindfulnessList}
      saving={saving}
      //@ts-ignore
      handleSaveItem={handleSaveMindfulness}
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterMindfulnessScreen;
