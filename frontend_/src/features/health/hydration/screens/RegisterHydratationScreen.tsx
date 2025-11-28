import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import RegisterHydrationMainContent from '@/features/health/hydration/components/RegisterHydrationMainContent';
import { useHydration } from '../hooks/useHydration';
import { formatDateToISO } from '@/share/utils/formatDatetimeToISO';
import { router } from 'expo-router';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import do toast

const VOLUMES = [250, 500, 750, 1000];

const RegisterHydrationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(VOLUMES.map((v) => [v, 0]))
  );

  const { handleHydrationCreate, error } = useHydration();
  const { showToast } = useToast(); // 🔹 hook do toast

  const handleQuantityChange = (volume: number, amount: number) =>
    setQuantities((prev) => ({ ...prev, [volume]: amount }));

  const calculateTotal = () => {
    const sumPreset = Object.entries(quantities).reduce(
      (acc, [vol, qty]) => acc + Number(vol) * qty,
      0
    );

    const custom = parseInt(customAmount) || 0;

    return sumPreset + custom;
  };

  const handleSave = async () => {
    const quantity = calculateTotal();
    if (!quantity) return;

    try {
      await handleHydrationCreate({
        quantity,
        date: formatDateToISO(selectedDate),
      });

      showToast('Hidratação registrada com sucesso!', 'success'); // 🔹 toast de sucesso
      router.replace('/hydratation'); // 🔹 navegação após sucesso
    } catch (err) {
      console.error(err);
      showToast('Erro ao registrar hidratação', 'error'); // 🔹 toast de erro
    }
  };

  const handleDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  return (
    <>
      <FormHeader
        title="Registrar Hidratação"
        onSavePress={handleSave}
        onBackPress={() => router.push('/(app)/hydratation')}
      />

      <View style={styles.container}>
        <RegisterHydrationMainContent
          quantities={quantities}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          selectedDate={selectedDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleDateChange={handleDateChange}
          handleQuantityChange={handleQuantityChange}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});

export default RegisterHydrationScreen;
