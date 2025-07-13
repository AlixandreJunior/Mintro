import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { registerObjectiveLog } from '@/services/objectives/createObjective';
import { ObjectiveWrite } from '@/types/mental/objectives';

export function useObjectiveForm() {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const handleSave = async () => {
    if (!selectedObjectiveId || !selectedPeriod) {
      Alert.alert("Erro", "Selecione um objetivo e um período antes de salvar.");
      return;
    }

    const data: ObjectiveWrite = {
      activity: parseInt(selectedObjectiveId, 10),
      period: selectedPeriod as '1w' | '2w' | '3w',
    };

    try {
      await registerObjectiveLog(data);
      Alert.alert("Sucesso", "Objetivo registrado com sucesso!");
      router.back();
    } catch (error: any) {
      console.error("Erro ao registrar objetivo:", error);
      Alert.alert("Erro", error.message || "Erro ao registrar objetivo.");
    }
  };

  return {
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedPeriod,
    setSelectedPeriod,
    handleSave,
  };
}
