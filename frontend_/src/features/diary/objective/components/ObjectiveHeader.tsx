import { router, useLocalSearchParams } from 'expo-router';
import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useObjective } from '../hooks/useObjective';

interface ObjectiveHeaderProps {
  setRepeatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setReminderModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ObjectiveHeader: React.FC<ObjectiveHeaderProps> = ({
  setReminderModalVisible,
  setRepeatModalVisible,
}) => {
  const { id } = useLocalSearchParams();
  const { handleObjectiveDelete } = useObjective();

  return (
    <HeaderWithOptions
      title="Detalhes de Objetivo"
      options={[
        { label: 'Repetir', onPress: () => setRepeatModalVisible(true) },
        { label: 'Lembretes', onPress: () => setReminderModalVisible(true) },
        { label: 'Excluir', onPress: () => handleObjectiveDelete(Number(id)) },
      ]}
      onBackPress={() => router.replace('/(app)/(tabs)/mental')}
    />
  );
};
