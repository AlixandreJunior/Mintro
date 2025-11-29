import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import SelectInput from './ui/inputs/SelectInput';

interface ActivityEditModalProps {
  visible: boolean;
  onClose: () => void;
  item: any | null;
  type: 'exercise' | 'mindfulness';
  onSubmit: (data: any) => void;

  items: Array<{ id: number; name: string }>;
}

const ActivityEditModal: React.FC<ActivityEditModalProps> = ({
  visible,
  onClose,
  item,
  type,
  onSubmit,
  items,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<string>('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (!item) return;

    const iso = item.datetime ?? item.date ?? null;
    if (iso) {
      const parsed = new Date(iso);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
        setTime(parsed);
      }
    }

    setDuration(item.duration?.toString() || '');

    const extractedId =
      item.exercise_id ??
      item.mindfulness_id ??
      item.exercise?.id ??
      item.mindfulness?.id ??
      null;

    setSelectedItemId(extractedId);
  }, [item]);

  const handleSave = () => {
    if (!item?.id) return;

    const finalDate = new Date(date);
    finalDate.setHours(time.getHours());
    finalDate.setMinutes(time.getMinutes());
    finalDate.setSeconds(0);

    onSubmit({
      id: item.id,
      datetime: finalDate.toISOString(),
      duration: Number(duration),
      [`${type}_id`]: selectedItemId,
    });

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Editar {type === 'exercise' ? 'Exercício' : 'Mindfulness'}
          </Text>

          <SelectInput
            label="Selecionar item"
            selectedValue={selectedItemId?.toString() || ''}
            onValueChange={(value) => setSelectedItemId(Number(value))}
            options={items.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
          />

          <DateTimeInput
            labelText="Data"
            mode="date"
            datetime={date}
            showPicker={showDatePicker}
            onPress={() => setShowDatePicker(true)}
            onChange={(_e, selected) => {
              setShowDatePicker(false);
              if (selected) setDate(selected);
            }}
          />

          <DateTimeInput
            labelText="Hora"
            mode="time"
            datetime={time}
            showPicker={showTimePicker}
            onPress={() => setShowTimePicker(true)}
            onChange={(_e, selected) => {
              setShowTimePicker(false);
              if (selected) setTime(selected);
            }}
          />

          <MainInput
            labelText="Duração (min)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityEditModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 22,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 18,
    color: '#111',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 26,
  },
  button: {
    marginLeft: 18,
  },
  cancelText: {
    fontSize: 14,
    color: '#777',
  },
  saveText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
