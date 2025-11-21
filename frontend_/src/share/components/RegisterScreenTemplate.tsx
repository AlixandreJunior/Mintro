import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import FormHeader from './layout/FormHeader';
import RegisterFormContent from './RegisterFormContent';
import { formatDatetimeToISO } from '@/share/utils/formatDatetimeToISO';

interface Item {
  id: number;
  name: string;
}

interface RegisterScreenHookProps<T extends Item, TPayload> {
  title: string;
  items: T[];
  handleSaveItem: (data: TPayload) => Promise<any>;
  labelSelect: string;
  onSuccessRedirect?: () => void;
}

export default function RegisterScreenTemplate<T extends Item, TPayload>({
  title,
  items,
  handleSaveItem,
  labelSelect,
  onSuccessRedirect,
}: RegisterScreenHookProps<T, TPayload>) {
  const defaultItemId = useMemo(() => items?.[0]?.id ?? null, [items]);

  const [itemId, setItemId] = useState<number | null>(defaultItemId);
  const [duration, setDuration] = useState(0);
  const [datetime, setDatetime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const validateForm = useCallback(() => {
    if (!itemId) {
      Alert.alert('Erro', `Selecione um ${labelSelect.toLowerCase()}.`);
      return false;
    }

    if (!duration || duration <= 0) {
      Alert.alert('Erro', 'A duração deve ser um número positivo.');
      return false;
    }

    return true;
  }, [itemId, duration, labelSelect]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    const payload = {
      [labelSelect.toLowerCase()]: itemId,
      duration,
      datetime: formatDatetimeToISO(datetime),
    } as TPayload;

    await handleSaveItem(payload);

    Alert.alert('Sucesso', `${labelSelect} registrado com sucesso!`);
    onSuccessRedirect?.();
  }, [
    itemId,
    duration,
    datetime,
    handleSaveItem,
    labelSelect,
    validateForm,
    onSuccessRedirect,
  ]);

  return (
    <View style={styles.container}>
      <FormHeader title={title} onSavePress={handleSave} />

      <RegisterFormContent
        items={items}
        selectedItemId={itemId}
        onSelectItem={setItemId}
        datetime={datetime}
        setDatetime={setDatetime}
        duration={duration}
        setDuration={setDuration}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
