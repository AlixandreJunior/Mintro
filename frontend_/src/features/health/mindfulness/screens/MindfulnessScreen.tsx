import React, { useEffect, useState } from 'react';
import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';
import { useMindfulness } from '../hooks/useMindfulness';
import ActivityEditModal from '@/share/components/ActivityEditModal';
import { Mindfulness } from '@/share/types/health/mindfulness';
import { useToast } from '@/share/providers/ToastProvider';

const MindfulnessScreen = () => {
  const title = 'Mindfulness';
  const type = 'mindfulness';

  const {
    handleMindfulnessList,
    handleMindfulnessLogDelete,
    handleMindfulnessLogUpdate,
  } = useMindfulness();

  const { showToast } = useToast();

  const [mindfulnessItems, setMindfulnessItems] = useState<Mindfulness[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const loadMindfulnessItems = async () => {
    try {
      const data = await handleMindfulnessList();
      setMindfulnessItems(data);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar mindfulness', 'error');
    }
  };

  useEffect(() => {
    loadMindfulnessItems();
  }, []);

  const handlePress = () => {
    router.push('./mindfulness/register');
  };

  const handleEdit = (id: number) => {
    setEditingItem(id);
    setModalVisible(true);
  };

  const handleSave = async (payload: any) => {
    try {
      await handleMindfulnessLogUpdate(payload.id, payload);
      showToast('Mindfulness atualizado com sucesso!', 'success');
      setModalVisible(false);
      setEditingItem(null);
      loadMindfulnessItems(); // 🔹 recarrega a lista após salvar
    } catch (err) {
      console.error(err);
      showToast('Erro ao atualizar mindfulness', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await handleMindfulnessLogDelete(id);
      showToast('Mindfulness deletado com sucesso!', 'success');
      loadMindfulnessItems(); // 🔹 recarrega a lista após deletar
    } catch (err) {
      console.error(err);
      showToast('Erro ao deletar mindfulness', 'error');
    }
  };

  return (
    <>
      <ActivityScreenTemplate
        title={title}
        type={type}
        onAddPress={handlePress}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ActivityEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type="mindfulness"
        item={editingItem}
        items={mindfulnessItems}
        onSubmit={handleSave}
      />
    </>
  );
};

export default MindfulnessScreen;
