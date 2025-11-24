import React, { use, useEffect, useState } from 'react';
import { router } from 'expo-router';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';
import { useMindfulness } from '../hooks/useMindfulness';
import { Mindfulness } from '@/share/types/health/mindfulness';

const RegisterMindfulnessScreen = () => {
  const { handleMindfulnessLogCreate, handleMindfulnessList } =
    useMindfulness();
  const [mindfulness, setMindfulness] = useState<Mindfulness[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await handleMindfulnessList();
      setMindfulness(data);
    };

    load();
  }, []);

  return (
    <RegisterScreenTemplate
      title="Registrar Mindfulness"
      labelSelect="Mindfulness_id"
      items={mindfulness}
      handleSaveItem={handleMindfulnessLogCreate}
      onSuccessRedirect={() => router.back()}
    />
  );
};

export default RegisterMindfulnessScreen;
