import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { PeriodsSection } from '@/components/PeriodsSection';
import { ActivitiesSection } from '@/components/ActivitySection';
import { DateTimeInput } from '@/components/Inputs/DateTimeInput'; // Ajuste caminho
import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm'; // Hook atualizado que você passou

const RepetitionsSection: FC<{
  selected: '1x' | '3x' | '5x' | null;
  setSelected: Dispatch<SetStateAction<'1x' | '3x' | '5x' | null>>;
}> = ({ selected, setSelected }) => {
  const options = [
    { label: '1 Vez', value: '1x' },
    { label: '3 Vezes', value: '3x' },
    { label: '5 Vezes', value: '5x' },
  ];

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Repetir</Text>
      {options.map(({ label, value }) => {
        const isSelected = selected === value;
        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.optionContainer,
              isSelected && styles.optionSelected,
            ]}
            //@ts-ignore
            onPress={() => setSelected(value)}
            activeOpacity={0.7}
          >
            <Text style={isSelected ? styles.optionTextSelected : undefined}>
              {isSelected ? '🔘' : '⚪'} {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RemindersSection: FC<{
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
}> = ({ enabled, setEnabled, time, setTime }) => {
  const [showPicker, setShowPicker] = useState(false);

  const parseTimeStringToDate = (timeStr: string) => {
    if (!timeStr) return new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.reminderHeader}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <DateTimeInput
        labelText="Horário do lembrete"
        datetime={parseTimeStringToDate(time)}
        showPicker={showPicker}
        onPress={() => enabled && setShowPicker(true)}
        onChange={handleChange}
        mode="time"
      />
    </View>
  );
};

// Tela principal

const CreateObjectiveScreen: FC = () => {
  const {
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedPeriod,
    setSelectedPeriod,
    selectedRepeat,
    setSelectedRepeat,
    remindersEnabled,
    setRemindersEnabled,
    reminderTime,
    setReminderTime,
    handleSave,
  } = useObjectiveForm();

  return (
    <View style={styles.container}>
      <Header avatarChar="A" />
      <FormHeader title="Criar Objetivo" onSavePress={handleSave} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ActivitiesSection
          title="Escolha um objetivo"
          //@ts-ignore
          selected={selectedObjectiveId}
          //@ts-ignore
          setSelected={setSelectedObjectiveId}
          multiple={false}
        />

        <RepetitionsSection
          selected={selectedRepeat}
          setSelected={setSelectedRepeat}
        />

        <PeriodsSection
          selectedPeriod={selectedPeriod}
          //@ts-ignore

          setSelectedPeriod={setSelectedPeriod}
        />

        <RemindersSection
          enabled={remindersEnabled}
          setEnabled={setRemindersEnabled}
          time={reminderTime}
          setTime={setReminderTime}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  sectionContainer: { marginTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: '#1E90FF',
    backgroundColor: '#E6F0FF',
  },
  optionTextSelected: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CreateObjectiveScreen;
