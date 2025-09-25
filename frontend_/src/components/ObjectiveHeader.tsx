import { router, useLocalSearchParams } from 'expo-router';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import { useObjectiveManager } from '@/hooks/useObjective';

interface ObjectiveHeaderProps {
  setRepeatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setReminderModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ObjectiveHeader: React.FC<ObjectiveHeaderProps> = ({
  setReminderModalVisible,
  setRepeatModalVisible,
}) => {
  const { id } = useLocalSearchParams();
  const { deleteById } = useObjectiveManager();

  return (
    <HeaderWithOptions
      title="Detalhes de Objetivo"
      options={[
        { label: 'Repetir', onPress: () => setRepeatModalVisible(true) },
        { label: 'Lembretes', onPress: () => setReminderModalVisible(true) },
        { label: 'Excluir', onPress: () => deleteById(Number(id)) },
      ]}
      onBackPress={() => router.replace('/(app)/(tabs)/mental')}
    />
  );
};
