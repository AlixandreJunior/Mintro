import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import RegisterHydrationMainContent from '@/share/components/RegisterHydrationMainContent';
import { useHydration, VOLUMES } from '@/share/hooks/useHydratationLog';

const RegisterHydrationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    VOLUMES.reduce((acc, vol) => ({ ...acc, [vol]: 0 }), {})
  );
  const [isSaving, setIsSaving] = useState(false);

  const { handleDateChange, handleSave } = useHydration(selectedDate);

  const handleQuantityChange = (volume: number, quantity: number) =>
    setQuantities((q) => ({ ...q, [volume]: quantity }));

  return (
    <>
      <FormHeader
        title="Registrar Hidratação"
        onSavePress={() =>
          handleSave({ quantities, customAmount, selectedDate })
        }
      />
      <View style={styles.container}>
        <RegisterHydrationMainContent
          customAmount={customAmount}
          handleDateChange={(event, date) =>
            handleDateChange(event, date, setShowDatePicker)
          }
          handleQuantityChange={handleQuantityChange}
          quantities={quantities}
          selectedDate={selectedDate}
          setCustomAmount={setCustomAmount}
          setShowDatePicker={setShowDatePicker}
          showDatePicker={showDatePicker}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
});

export default RegisterHydrationScreen;
