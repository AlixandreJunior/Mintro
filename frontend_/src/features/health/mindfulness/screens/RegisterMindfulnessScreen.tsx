import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RegisterScreenTemplate from '@/share/components/RegisterScreenTemplate';
import { useMindfulness } from '../hooks/useMindfulness';
import { Mindfulness } from '@/share/types/health/mindfulness';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import do toast

const RegisterMindfulnessScreen = () => {
  const { handleMindfulnessLogCreate, handleMindfulnessList } =
    useMindfulness();
  const [mindfulness, setMindfulness] = useState<Mindfulness[]>([]);
  const { showToast } = useToast(); // 🔹 hook do toast

  const onPressBack = () => {
    router.push('/(app)/mindfulness');
  };

  useEffect(() => {
    const load = async () => {
      const data = await handleMindfulnessList();
      setMindfulness(data);
    };
    load();
  }, []);

  // Função para salvar e mostrar toast
  const handleSaveItemWithToast = async (itemId: number) => {
    try {
      await handleMindfulnessLogCreate(itemId);
      showToast('Mindfulness registrado com sucesso!', 'success'); // 🔹 toast de sucesso
      onPressBack(); // voltar para a tela de mindfulness
    } catch (err) {
      console.error(err);
      showToast('Erro ao registrar mindfulness', 'error'); // 🔹 toast de erro
    }
  };

  return (
    <RegisterScreenTemplate
      title="Registrar Mindfulness"
      labelSelect="Mindfulness_id"
      items={mindfulness}
      handleSaveItem={handleSaveItemWithToast} // 🔹 substituí a função original
      onSuccessRedirect={onPressBack}
      onBackPress={onPressBack}
    />
  );
};

export default RegisterMindfulnessScreen;
