import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/Layout/Header'; // Cabeçalho superior
import FormHeader from '@/components/Layout/FormHeader'; // Cabeçalho "Criar Objetivo"
import { PeriodsSection } from '@/components/PeriodsSection';
import { ActivitiesSection } from '@/components/ActivitySection';
import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm';
import { RepeatSection } from '@/components/RepeatSection';
import { RemindersSection } from '@/components/RemindersSection';

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
          selected={selectedObjectiveId}
          //@ts-ignore
          setSelected={setSelectedObjectiveId}
          multiple={false}
        />

        <RepeatSection
          selectedRepeat={selectedRepeat}
          setSelectedRepeat={setSelectedRepeat}
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
});

export default CreateObjectiveScreen;
