import { View, StyleSheet } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import { useObjective } from '../hooks/useObjective';
import ObjectiveForm from '../components/ObjectiveForm';
import { useState } from 'react';

export default function RegisterObjectiveScreen() {
  const [activities, setActivities] = useState<string | null>(null);
  const [repeat, setRepeat] = useState<'1x' | '3x' | '5x' | null>(null);

  const { handleObjectiveCreate } = useObjective();

  const onSavePress = () => {
    if (!activities || !repeat) {
      return;
    }

    const data = {
      activities,
      repeat,
    };

    handleObjectiveCreate(data);
    
  };

  return (
    <View style={styles.container}>
      <FormHeader title="Criar Objetivo" onSavePress={onSavePress} />

      <ObjectiveForm
        activities={activities}
        repeat={repeat}
        setActivities={setActivities}
        setRepeat={setRepeat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
