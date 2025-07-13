import { Provider as PaperProvider } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import SelectInput from '@/components/Inputs/SelectInput';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput';
import { MainInput } from '@/components/Inputs/MainInput';

interface Item {
  id: number;
  name: string;
}

interface RegisterScreenProps<T extends Item> {
  title: string;
  fetchItemList: () => Promise<T[]>;
  registerLog: (data: any) => Promise<any>;
  initialDuration?: string;
  labelSelect: string;
  onSuccessRedirect?: () => void;
}

export default function RegisterScreenTemplate<T extends Item>({
  title,
  fetchItemList,
  registerLog,
  initialDuration = '30',
  labelSelect,
  onSuccessRedirect,
}: RegisterScreenProps<T>) {
  const [itemList, setItemList] = useState<T[]>([]);
  const [itemId, setItemId] = useState<number | null>(null);
  const [duration, setDuration] = useState(initialDuration);
  const [datetime, setDatetime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    fetchItemList()
      .then((data) => {
        setItemList(data);
        if (data.length > 0) setItemId(data[0].id);
      })
      .catch((error: any) =>
        Alert.alert('Erro', error.message || `Não foi possível carregar ${labelSelect.toLowerCase()}.`)
      );
  }, [fetchItemList, labelSelect]);

  const updateDate = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      const updated = new Date(datetime);
      updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setDatetime(updated);
    }
  };

  const updateTime = (_event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      const updated = new Date(datetime);
      updated.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setDatetime(updated);
    }
  };

  const formatDatetimeToISO = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  };

  const handleSave = async () => {
    if (!itemId) return Alert.alert('Erro', `Selecione um ${labelSelect.toLowerCase()}.`);
    if (!duration || +duration <= 0) return Alert.alert('Erro', 'A duração deve ser um número positivo.');

    setLoadingSave(true);
    const data = {
      // chave dinâmica: ex: 'exercise' ou 'mindfulness'
      [labelSelect.toLowerCase()]: itemId,
      duration: +duration,
      datetime: formatDatetimeToISO(datetime),
    };

    try {
      await registerLog(data);
      Alert.alert('Sucesso', `${labelSelect} registrado com sucesso!`);
      if (onSuccessRedirect) onSuccessRedirect();
    } catch (error: any) {
      Alert.alert('Erro', error.message || `Não foi possível registrar o ${labelSelect.toLowerCase()}.`);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Header avatarChar="A" />
        <FormHeader title={title} onSavePress={handleSave} />

        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <SelectInput
            label={labelSelect}
            selectedValue={itemId?.toString() || ''}
            onValueChange={(value) => setItemId(+value)}
            options={itemList.map((item) => ({ label: item.name, value: item.id.toString() }))}
          />

          <DateTimeInput
            labelText="Data"
            datetime={datetime}
            mode="date"
            onChange={updateDate}
            onPress={() => setShowDatePicker(true)}
            showPicker={showDatePicker}
          />

          <DateTimeInput
            labelText="Hora"
            datetime={datetime}
            mode="time"
            onChange={updateTime}
            onPress={() => setShowTimePicker(true)}
            showPicker={showTimePicker}
          />

          <MainInput
            labelText="Duração (minutos)"
            onChangeText={setDuration}
            keyboardType="numeric"
            value={duration}
          />

          {loadingSave && (
            <View style={styles.savingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.savingText}>Registrando...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContent: { padding: 16 },
  savingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  savingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
});
