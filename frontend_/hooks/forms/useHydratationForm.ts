import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { registerHydratationLog } from '@/services/hydratation/registerHydratation';
import { formatDatetimeToISO } from '@/utils/formatDatetimeToISO';

export const VOLUMES = [250, 500, 750, 1000] as const;

export function useHydrationForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    VOLUMES.reduce((acc, vol) => ({ ...acc, [vol]: 0 }), {})
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleQuantityChange = (volume: number, quantity: number) =>
    setQuantities((q) => ({ ...q, [volume]: quantity }));

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if ((Platform.OS === 'android' && event.type === 'set' && date) || (date && Platform.OS !== 'android')) {
      setSelectedDate(date);
    }
  };

  const handleSave = async () => {
    const totalFromQuantities = VOLUMES.reduce(
      (sum, vol) => sum + (quantities[vol] || 0) * vol,
      0
    );
    const custom = parseFloat(customAmount) || 0;
    const totalHydration = totalFromQuantities + custom;

    if (totalHydration <= 0) {
      Alert.alert('Erro', 'A quantidade total de hidratação deve ser maior que zero.');
      return;
    }

    setIsSaving(true);
    try {
      await registerHydratationLog({
        quantity: totalHydration,
        date: formatDatetimeToISO(selectedDate),
      });
      Alert.alert('Sucesso', 'Hidratação registrada com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar hidratação.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    selectedDate,
    showDatePicker,
    setShowDatePicker,
    customAmount,
    setCustomAmount,
    quantities,
    handleQuantityChange,
    handleDateChange,
    handleSave,
    isSaving,
  };
}
