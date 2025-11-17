import React, { FC, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import { PeriodsSection } from '@/share/components/PeriodsSection';
import { ActivitiesSection } from '@/share/components/ActivitySection';
import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm';
import { RepeatSection } from '@/share/components/RepeatSection';
import { RemindersSection } from '@/features/reminder/components/RemindersSection';

interface ObjectiveFormProps {
  selectedObjectiveId: string | null;
  selectedRepeat: '1x' | '3x' | '5x' | null;
  remindersEnabled: boolean;
  reminderTime: string;
  setSelectedObjectiveId: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRepeat: (value: '1x' | '3x' | '5x') => void;
  setRemindersEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setReminderTime: React.Dispatch<React.SetStateAction<string>>;
}

const ObjectiveForm: FC<ObjectiveFormProps> = ({
  selectedObjectiveId,
  selectedRepeat,
  remindersEnabled,
  reminderTime,
  setSelectedObjectiveId,
  setSelectedRepeat,
  setRemindersEnabled,
  setReminderTime,
}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ActivitiesSection
        title="Escolha um objetivo"
        selected={selectedObjectiveId}
        setSelected={setSelectedObjectiveId}
        multiple={false}
      />
      <RepeatSection
        selectedRepeat={selectedRepeat}
        setSelectedRepeat={setSelectedRepeat}
      />
      <RemindersSection
        enabled={remindersEnabled}
        setEnabled={setRemindersEnabled}
        time={reminderTime}
        setTime={setReminderTime}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
});

export default ObjectiveForm;
