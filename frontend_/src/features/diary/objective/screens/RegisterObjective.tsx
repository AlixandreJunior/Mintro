import { View, StyleSheet } from 'react-native';
import FormHeader from '@/share/components/layout/FormHeader';
import { useObjective } from '../hooks/useObjective';
import ObjectiveForm from '../components/ObjectiveForm';
import { useState } from 'react';
import { router } from 'expo-router';
import { useToast } from '@/share/providers/ToastProvider';

export default function RegisterObjectiveScreen() {
  const [activities, setActivities] = useState<string | null>(null);
  const [repeat, setRepeat] = useState<'1x' | '3x' | '5x' | null>(null);

  const { handleObjectiveCreate } = useObjective();
  const { showToast } = useToast();

  const onSavePress = async () => {
    if (!activities || !repeat) {
      showToast('Preencha todas as informações!', 'error');
      return;
    }

    const data = {
      activities,
      repeat,
    };

    try {
      await handleObjectiveCreate(data);
      showToast('Objetivo criado com sucesso!', 'success');
      router.push('/(app)/(tabs)/mental');
    } catch (err) {
      console.error(err);
      showToast('Erro ao criar objetivo!', 'error');
    }
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
