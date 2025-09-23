import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FormHeader from '@/components/layout/FormHeader';
import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm';
import ObjectiveForm from '@/components/ObjectiveForm';

const RegisterObjectiveScreen: FC = () => {
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(
    null
  );
  const [selectedRepeat, setSelectedRepeat] = useState<
    '1x' | '3x' | '5x' | null
  >(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('');

  const { handleSave } = useObjectiveForm();

  return (
    <View style={styles.container}>
      <FormHeader
        title="Criar Objetivo"
        onSavePress={() =>
          handleSave({
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
