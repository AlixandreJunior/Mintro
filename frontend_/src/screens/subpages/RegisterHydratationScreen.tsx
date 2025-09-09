import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/layout/Header';
import FormHeader from '@/components/layout/FormHeader';
import { DateTimeInput } from '@/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/components/ui/inputs/MainInput';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useHydrationForm } from '@/hooks/forms/useHydratationForm';

const RegisterHydrationScreen = () => {
  const {
    selectedDate,
    showDatePicker,
    setShowDatePicker,
    quantities,
    handleQuantityChange,
    handleDateChange,
    customAmount,
    setCustomAmount,
    handleSave,
  } = useHydrationForm();

  return (
    <>
      <Header avatarChar="A" />
      <FormHeader title="Registrar Hidratação" onSavePress={handleSave} />
      <View style={styles.container}>
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
            onChangeText={(text) =>
              setCustomAmount(text.replace(/[^0-9]/g, ''))
            }
            value={customAmount}
            placeholder="Coloque uma quantidade personalizada"
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  scrollViewContent: { paddingBottom: 20 },
});

export default RegisterHydrationScreen;
