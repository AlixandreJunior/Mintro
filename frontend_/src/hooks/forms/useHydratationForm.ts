import { Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { registerHydratationLog } from '@/services/hydratation/registerHydratation';
import { formatDateToISO } from '@/utils/formatDatetimeToISO';

export const VOLUMES = [250, 500, 750, 1000] as const;

interface SaveParams {
  quantities: Record<number, number>;
  customAmount: string;
  selectedDate: Date;
}

export function useHydrationForm() {
  const calculateTotal = (
    quantities: Record<number, number>,
    customAmount: string
  ) => {
    const totalFromQuantities = VOLUMES.reduce(
      (sum, vol) => sum + (quantities[vol] || 0) * vol,
      0
    );
    const custom = parseFloat(customAmount) || 0;
    return totalFromQuantities + custom;
  };

  const handleDateChange = (
    event: any,
    date: Date | undefined,
    setSelectedDate: (d: Date) => void,
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

  const handleSave = async (
    { quantities, customAmount, selectedDate }: SaveParams,
    setIsSaving: (v: boolean) => void
  ) => {
    const totalHydration = calculateTotal(quantities, customAmount);

    if (totalHydration <= 0) {
      Alert.alert(
        'Erro',
        'A quantidade total de hidratação deve ser maior que zero.'
      );
      return;
    }

    setIsSaving(true);
    try {
      await registerHydratationLog({
        quantity: totalHydration,
        date: formatDateToISO(selectedDate),
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
    calculateTotal,
    handleDateChange,
    handleSave,
  };
}
