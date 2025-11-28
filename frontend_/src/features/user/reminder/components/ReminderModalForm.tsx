import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import SelectInput from '@/share/components/ui/inputs/SelectInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import { NotificationType } from './ReminderCreateSection';
import ReminderModalButtons from './ReminderModalButtons';
import SwitchInputGroup from '@/share/components/ui/inputs/SwitchInputGroup';

interface Props {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  date: Date;
  setDate: (value: Date) => void;
  time: Date;
  setTime: (value: Date) => void;
  isDaily: boolean;
  setIsDaily: (value: boolean) => void;
  type: NotificationType;
  setType: (value: NotificationType) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  showTimePicker: boolean;
  setShowTimePicker: (value: boolean) => void;

  onClose: () => void;
  onSave: () => void;

  errors?: Record<string, string[]>; // 🔥 ADICIONADO
}

const NOTIFICATION_TYPES = [
  { value: 'diario', label: 'Diário' },
  { value: 'hidratacao', label: 'Hidratação' },
  { value: 'exercicio', label: 'Exercício' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'outro', label: 'Outro' },
];

const ReminderModalForm: React.FC<Props> = ({
  title,
  setTitle,
  content,
  setContent,
  date,
  setDate,
  time,
  setTime,
  isDaily,
  setIsDaily,
  type,
  setType,
  showDatePicker,
  setShowDatePicker,
  showTimePicker,
  setShowTimePicker,
  onClose,
  onSave,
  errors = {},
}) => {
  return (
    <View style={styles.container}>
      <MainInput
        labelText="Título"
        value={title}
        onChangeText={setTitle}
        errors={errors.title}
      />

      <MainInput
        labelText="Mensagem"
        value={content}
        onChangeText={setContent}
        errors={errors.content}
      />

      <DateTimeInput
        labelText="Data"
        datetime={date}
        showPicker={showDatePicker}
        onPress={() => setShowDatePicker(true)}
        onChange={(_e, selected) => {
          setShowDatePicker(false);
          if (selected) setDate(selected);
        }}
        mode="date"
        errors={errors.date}
      />

      <DateTimeInput
        labelText="Hora"
        datetime={time}
        showPicker={showTimePicker}
        onPress={() => setShowTimePicker(true)}
        onChange={(_e, selected) => {
          setShowTimePicker(false);
          if (selected) setTime(selected);
        }}
        mode="time"
        errors={errors.time}
      />

      <SwitchInputGroup
        containerLabel="Repetição"
        items={[
          {
            key: 'daily',
            label: 'Repetir diariamente',
            value: isDaily,
          },
        ]}
        onToggle={() => setIsDaily(!isDaily)}
      />

      <SelectInput
        label="Tipo"
        selectedValue={type}
        onValueChange={(v) => setType(v as NotificationType)}
        options={NOTIFICATION_TYPES}
        errors={errors.type}
      />

      <ReminderModalButtons onClose={onClose} onSave={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default ReminderModalForm;
