import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import ObjectiveForm from '@/share/components/ObjectiveForm';
import { useObjectiveManager } from '@/share/hooks/useObjective';

const RegisterObjectiveScreen: FC = () => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(
    null
  );
  const [selectedRepeat, setSelectedRepeat] = useState<
    '1x' | '3x' | '5x' | null
  >(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('');

  const { saveObjective } = useObjectiveManager();

  return (
    <View style={styles.container}>
      <FormHeader
        title="Criar Objetivo"
        onSavePress={() =>
          saveObjective({
            selectedObjectiveId,
            selectedRepeat,
            remindersEnabled,
            reminderTime,
          })
        }
      />
      <ObjectiveForm
        reminderTime={reminderTime}
        remindersEnabled={remindersEnabled}
        selectedObjectiveId={selectedObjectiveId}
        selectedRepeat={selectedRepeat}
        setReminderTime={setReminderTime}
        setRemindersEnabled={setRemindersEnabled}
        setSelectedObjectiveId={setSelectedObjectiveId}
        setSelectedRepeat={setSelectedRepeat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default RegisterObjectiveScreen;
