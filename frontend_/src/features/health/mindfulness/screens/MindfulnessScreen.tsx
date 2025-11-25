import React, { useEffect, useState } from 'react';
import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';
import { useMindfulness } from '../hooks/useMindfulness';
import ActivityEditModal from '@/share/components/ActivityEditModal';
import { Mindfulness } from '@/share/types/health/mindfulness';

const MindfulnessScreen = () => {
  const title = 'Mindfulness';
  const type = 'mindfulness';

  const {
    handleMindfulnessList,
    handleMindfulnessLogDelete,
    handleMindfulnessLogUpdate,
  } = useMindfulness();

  const [mindfulnessItems, setMindfulnessItems] = useState<Mindfulness[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [editingItem, setEditingItem] = useState<number | null>(null);
  useEffect(() => {
    const load = async () => {
      const data = await handleMindfulnessList();
      setMindfulnessItems(data);
    };
    load();
  }, []);

  const handlePress = () => {
    router.push('./mindfulness/register');
  };

  const handleEdit = (id: number) => {
    setEditingItem(id);
    setModalVisible(true);
  };

  const handleSave = async (payload: any) => {
    await handleMindfulnessLogUpdate(payload.id, payload);
    setModalVisible(false);
    setEditingItem(null);
  };

  return (
    <>
      <ActivityScreenTemplate
        title={title}
        type={type}
        onAddPress={handlePress}
        onDelete={handleMindfulnessLogDelete}
        onEdit={handleEdit}
      />

      <ActivityEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type="mindfulness"
        item={editingItem}
        items={mindfulnessItems} // ← LISTA DO BACKEND ✔
        onSubmit={handleSave}
      />
    </>
  );
};

export default MindfulnessScreen;
