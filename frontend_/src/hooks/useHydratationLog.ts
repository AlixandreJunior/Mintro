import { useState, useEffect, useMemo } from 'react';
import { Alert, Platform } from 'react-native';
import { router } from 'expo-router';

import { registerHydratationLog } from '@/services/hydratation/registerHydratation';
import { getHydratationList } from '@/services/hydratation/listHydratation';
import { Hydratation } from '@/types/health/hydratation';
import { formatDateToISO } from '@/utils/formatDatetimeToISO';
import { calculateHydration } from '@/utils/healthStats';
import { calculateTotalHydration } from '@/utils/calculateTotalHydration';

export const VOLUMES = [250, 500, 750, 1000] as const;

interface SaveParams {
  quantities: Record<number, number>;
  customAmount: string;
  selectedDate: Date;
}

export function useHydration(initialDate: Date, dailyGoal: number = 2000) {
  const [logs, setLogs] = useState<Hydratation[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = (
    event: any,
    date: Date | undefined,
    setShowDatePicker: (v: boolean) => void
  ) => {
    setShowDatePicker(false);
    if (
      (Platform.OS === 'android' && event.type === 'set' && date) ||
      (date && Platform.OS !== 'android')
    ) {
      setSelectedDate(date);
    }
  };

  const handleSave = async ({
    quantities,
    customAmount,
    selectedDate,
  }: SaveParams) => {
    const totalHydration = calculateTotalHydration(quantities, customAmount);

    if (totalHydration <= 0) {
      Alert.alert(
        'Erro',
        'A quantidade total de hidratação deve ser maior que zero.'
      );
      return;
    }

    setSaving(true);
    try {
      await registerHydratationLog({
        quantity: totalHydration,
        date: formatDateToISO(selectedDate),
      });
      Alert.alert('Sucesso', 'Hidratação registrada com sucesso!');
      router.back();
      refreshLogs();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao registrar hidratação.');
    } finally {
      setSaving(false);
    }
  };

  const refreshLogs = async () => {
    setLoading(true);
    try {
      const data = await getHydratationList(selectedDate);
      setLogs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar hidratação');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLogs();
  }, [selectedDate]);

  const { totalHydrationToday, hydrationProgressPercentage } = useMemo(
    () => calculateHydration(logs, dailyGoal),
    [logs, dailyGoal]
  );

  return {
    logs,
    loading,
    saving,
    error,
    selectedDate,

    totalHydrationToday,
    hydrationProgressPercentage,

    setSelectedDate,
    handleDateChange,
    handleSave,
    refreshLogs,
  };
}
