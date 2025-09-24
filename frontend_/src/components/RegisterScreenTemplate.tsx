import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import FormHeader from './layout/FormHeader';
import RegisterFormContent from './RegisterFormContent';
import { formatDatetimeToISO } from '@/utils/formatDatetimeToISO';
import { ExerciseLogWrite } from '@/types/health/exercise';
import { MindfulnessLogWrite } from '@/types/health/mindfulness';

interface Item {
  id: number;
  name: string;
}

interface RegisterScreenHookProps<T extends Item> {
  title: string;
  items: T[];
  saving: boolean;
  handleSaveItem: (
    data: ExerciseLogWrite | MindfulnessLogWrite
  ) => Promise<any>;
  labelSelect: string;
  onSuccessRedirect?: () => void;
}

export default function RegisterScreenTemplate<T extends Item>({
  title,
  items,
  saving,
  handleSaveItem,
  labelSelect,
  onSuccessRedirect,
}: RegisterScreenHookProps<T>) {
  const [itemId, setItemId] = useState<number | null>(items?.[0]?.id || null);
  const [duration, setDuration] = useState(0);
  const [datetime, setDatetime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = async () => {
    if (!itemId)
      return Alert.alert('Erro', `Selecione um ${labelSelect.toLowerCase()}.`);
    if (!duration || +duration <= 0)
      return Alert.alert('Erro', 'A duração deve ser um número positivo.');

    const data = {
      [labelSelect.toLowerCase()]: itemId,
      duration: +duration,
      datetime: formatDatetimeToISO(datetime),
    };

    try {
      //@ts-ignore
      await handleSaveItem(data);
      Alert.alert('Sucesso', `${labelSelect} registrado com sucesso!`);
      if (onSuccessRedirect) onSuccessRedirect();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message ||
          `Não foi possível registrar o ${labelSelect.toLowerCase()}.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader title={title} onSavePress={handleSave} />

      <RegisterFormContent
        items={items}
        selectedItemId={itemId}
        onSelectItem={setItemId}
        datetime={datetime}
        setDatetime={setDatetime}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        duration={duration}
        setDuration={setDuration}
        saving={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
