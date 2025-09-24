import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ObjectiveModals from '@/components/ObjectiveModals';
import { ObjectiveMainContent } from '@/components/ObjectiveMainContent';
import { useState } from 'react';
import { ObjectiveHeader } from '@/components/ObjectiveHeader';
import { useObjectiveManager } from '@/hooks/useObjective';

const { height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();

  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [isReminderModalVisible, setReminderModalVisible] = useState(false);
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [selectedRepeat, setSelectedRepeat] = useState<string | null>(null);

  const { updating, objective, loading } = useObjectiveManager(Number(id));

  const closeModals = () => {
    setRepeatModalVisible(false);
    setReminderModalVisible(false);
  };

  const handleModalChange = (
    type: 'reminder' | 'repeat',
    value: string | null
  ) => {
    if (type === 'reminder') {
      setReminderTime(value);
    } else if (type === 'repeat') {
      setSelectedRepeat(value);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 32 }}
        />
      </SafeAreaView>
    );
  }

  if (!objective) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>
          Objetivo não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ObjectiveHeader
        setReminderModalVisible={setReminderModalVisible}
        setRepeatModalVisible={setRepeatModalVisible}
      />
      <ObjectiveMainContent objective={objective} />
      <ObjectiveModals
        visibleModal={
          isReminderModalVisible
            ? 'reminder'
            : isRepeatModalVisible
            ? 'repeat'
            : null
        }
        reminder={reminderTime}
        repeat={selectedRepeat?.replace('x', '')}
        updating={updating}
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
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
});
