import React, { useState, Dispatch, SetStateAction, FC } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  TextInput,
} from 'react-native';
import Header from '@/components/Layout/Header';
import FormHeader from '@/components/Layout/FormHeader';
import { PeriodsSection } from '@/components/PeriodsSection';
import { ActivitiesSection } from '@/components/ActivitySection';

// --- Tipos para Props e Hooks ---

type UseObjectiveFormReturn = {
  selectedObjectiveId: number | null;
  setSelectedObjectiveId: Dispatch<SetStateAction<number | null>>;
  selectedRepetition: number | null;
  setSelectedRepetition: Dispatch<SetStateAction<number | null>>;
  selectedPeriod: string | null;
  setSelectedPeriod: Dispatch<SetStateAction<string | null>>;
  remindersEnabled: boolean;
  setRemindersEnabled: Dispatch<SetStateAction<boolean>>;
  reminderTime: string;
  setReminderTime: Dispatch<SetStateAction<string>>;
  handleSave: () => void;
};

type RepetitionsSectionProps = {
  title: string;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

type RemindersSectionProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
};

// --- Mock de Componentes e Hooks (Tipados) ---

// Supondo que seu hook 'useObjectiveForm' seja atualizado para isto:
const useObjectiveForm = (): UseObjectiveFormReturn => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<number | null>(
    null
  );
  const [selectedRepetition, setSelectedRepetition] = useState<number | null>(
    null
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('');

  const handleSave = () => {
    // Lógica para salvar os dados
    console.log({
      objectiveId: selectedObjectiveId,
      repetition: selectedRepetition,
      period: selectedPeriod,
      reminders: remindersEnabled,
      time: reminderTime,
    });
    // Adicione a navegação ou feedback para o usuário aqui
  };

  return {
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedRepetition,
    setSelectedRepetition,
    selectedPeriod,
    setSelectedPeriod,
    remindersEnabled,
    setRemindersEnabled,
    reminderTime,
    setReminderTime,
    handleSave,
  };
};

// Componente para a seção "Repetir" (você pode criar em um arquivo separado)
const RepetitionsSection: FC<RepetitionsSectionProps> = ({
  title,
  selected,
  setSelected,
}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {/* Substitua isto por seus componentes de seleção/rádio reais */}
    <View style={styles.optionContainer}>
      <Text>⚪ 1 Vez</Text>
    </View>
    <View style={styles.optionContainer}>
      <Text>⚪ 3 Vezes</Text>
    </View>
    <View style={styles.optionContainer}>
      <Text>⚪ 5 Vezes</Text>
    </View>
  </View>
);

// Componente para a seção "Lembretes"
const RemindersSection: FC<RemindersSectionProps> = ({
  enabled,
  setEnabled,
  time,
  setTime,
}) => (
  <View style={styles.sectionContainer}>
    <View style={styles.reminderHeader}>
      <Text style={styles.sectionTitle}>Lembretes</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={enabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={setEnabled}
        value={enabled}
      />
    </View>
    <TextInput
      style={styles.timeInput}
      placeholder="Horario"
      value={time}
      onChangeText={setTime}
      editable={enabled} // Desativa o input se os lembretes estiverem desligados
    />
  </View>
);

// --- Tela Principal Atualizada ---

const CreateObjectiveScreen: FC = () => {
  const {
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedRepetition,
    setSelectedRepetition,
    selectedPeriod,
    setSelectedPeriod,
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
          title="Escolha um objetivo" // Título corrigido
          selected={selectedObjectiveId}
          //@ts-ignore
          setSelected={setSelectedObjectiveId}
          multiple={false}
        />

        <RepetitionsSection
          title="Repetir"
          selected={selectedRepetition}
          setSelected={setSelectedRepetition}
        />

        <PeriodsSection
          selectedPeriod={selectedPeriod}
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

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Cor de fundo da tela
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16, // Adiciona padding lateral
    paddingBottom: 20, // Espaço no final da rolagem
  },
  sectionContainer: {
    marginTop: 24, // Espaçamento entre as seções
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  optionContainer: {
    // Estilo de exemplo para RepetitionsSection
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 8,
  },
});

export default CreateObjectiveScreen;
