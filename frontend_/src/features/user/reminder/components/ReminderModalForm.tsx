import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { DateTimeInput } from '@/share/components/ui/inputs/DateTimeInput';
import SelectInput from '@/share/components/ui/inputs/SelectInput';
import { MainInput } from '@/share/components/ui/inputs/MainInput';
import { NotificationType } from './ReminderCreateSection';
import ReminderModalButtons from './ReminderModalButtons';

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
}

const NOTIFICATION_TYPES: { value: NotificationType; label: string }[] = [
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
}) => {
  return (
    <View style={styles.container}>
      <MainInput labelText="Título" value={title} onChangeText={setTitle} />
      <MainInput
        labelText="Mensagem"
        value={content}
        onChangeText={setContent}
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
      />

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <Text style={{ marginRight: 8 }}>Repetir diariamente</Text>
        <Switch value={isDaily} onValueChange={setIsDaily} />
      </View>

      <SelectInput
        label="Tipo"
        selectedValue={type}
        onValueChange={(v) => setType(v as NotificationType)}
        options={NOTIFICATION_TYPES.map((t) => ({
          label: t.label,
          value: t.value,
        }))}
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
