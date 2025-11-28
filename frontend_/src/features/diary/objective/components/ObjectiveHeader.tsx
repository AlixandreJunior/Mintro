import { router, useLocalSearchParams } from 'expo-router';
import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import { useObjective } from '../hooks/useObjective';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import do toast

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
  const { showToast } = useToast(); // 🔹 hook do toast

  const onDelete = async () => {
    try {
      await handleObjectiveDelete(Number(id));
      showToast('Objetivo deletado com sucesso!', 'success');
      router.replace('/(app)/(tabs)/mental');
    } catch (err) {
      console.error(err);
      showToast('Erro ao deletar objetivo!', 'error');
    }
  };

  return (
    <HeaderWithOptions
      title="Detalhes de Objetivo"
      options={[
        { label: 'Repetir', onPress: () => setRepeatModalVisible(true) },
        { label: 'Excluir', onPress: onDelete },
      ]}
      onBackPress={() => router.replace('/(app)/(tabs)/mental')}
    />
  );
};
