import { StyleSheet, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { useObjective } from '../hooks/useObjective';
import { ObjectiveHeader } from '../components/ObjectiveHeader';
import { ObjectiveMainContent } from '../components/ObjectiveMainContent';
import ObjectiveModals from '../components/ObjectiveModals';
import { Objective } from '@/share/types/mental/objectives';
import { useObjectiveModals } from '../hooks/useObjectiveModals';

export default function ObjectiveDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const numericId = Number(params.id);

  const { handleObjectiveRetrieve } = useObjective();
  const {
    handleModalChange,
    modalVisible,
    reminderTime,
    selectedRepeat,
    setModalVisible,
    closeModals,
  } = useObjectiveModals();

  const [objective, setObjective] = useState<Objective | null>(null);

  useEffect(() => {
    const load = async () => {
      const obj = await handleObjectiveRetrieve(numericId);

      if (!obj) {
        router.replace('/(app)/(tabs)/mental');
        return;
      }
      setObjective(obj);
    };
    load();
  }, [numericId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ObjectiveHeader
        setReminderModalVisible={() => setModalVisible('reminder')}
        setRepeatModalVisible={() => setModalVisible('repeat')}
      />

      <ObjectiveMainContent objective={objective} />

      <ObjectiveModals
        visibleModal={modalVisible}
        reminder={reminderTime}
        repeat={selectedRepeat?.replace('x', '') ?? null}
        onChange={handleModalChange}
        onClose={closeModals}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
