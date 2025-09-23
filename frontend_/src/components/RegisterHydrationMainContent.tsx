import { StyleSheet, ScrollView } from 'react-native';
import { DateTimeInput } from '@/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/components/ui/inputs/MainInput';
import { QuantitySelector } from '@/components/QuantitySelector';
import React from 'react';

interface RegisterHydrationProps {
  selectedDate: Date;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  quantities: Record<number, number>;
  handleQuantityChange: (volume: number, quantity: number) => void;
  handleDateChange: (event: any, date?: Date | undefined) => void;
  customAmount: string;
  setCustomAmount: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterHydrationMainContent: React.FC<RegisterHydrationProps> = ({
  selectedDate,
  showDatePicker,
  setShowDatePicker,
  quantities,
  handleQuantityChange,
  handleDateChange,
  customAmount,
  setCustomAmount,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <DateTimeInput
        labelText="Data"
        datetime={selectedDate}
        mode="date"
        onChange={handleDateChange}
        onPress={() => setShowDatePicker(true)}
        showPicker={showDatePicker}
      />
      <QuantitySelector
        quantities={quantities}
        onQuantityChange={handleQuantityChange}
      />
      <MainInput
        labelText="Quantidade Personalizada"
        keyboardType="numeric"
        onChangeText={(text) => setCustomAmount(text.replace(/[^0-9]/g, ''))}
        value={customAmount}
        placeholder="Coloque uma quantidade personalizada"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: { paddingBottom: 20 },
});

export default RegisterHydrationMainContent;
