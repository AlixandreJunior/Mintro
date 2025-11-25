import React, { useEffect, useState } from 'react';
import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';
import { useExercise } from '../hooks/useExercise';
import ActivityEditModal from '@/share/components/ActivityEditModal';
import { Exercise } from '@/share/types/health/exercise';

const ExerciseScreen = () => {
  const title = 'Atividade';
  const type = 'exercise';

  const {
    handleExerciseList,
    handleExerciseLogDelete,
    handleExerciseLogUpdate,
  } = useExercise();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await handleExerciseList();
      setExercises(data);
    };
    load();
  }, []);

  const handlePress = () => {
    router.push('./exercises/register');
  };

  const handleEdit = (id: number) => {
    setEditingItem(id);
    setModalVisible(true);
  };

  const handleSave = async (updatedData: any) => {
    await handleExerciseLogUpdate(updatedData.id, updatedData);

    setModalVisible(false);
    setEditingItem(null);
  };

  return (
    <>
      <ActivityScreenTemplate
        title={title}
        type={type}
        onAddPress={handlePress}
        onDelete={handleExerciseLogDelete}
        onEdit={handleEdit}
      />

      <ActivityEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type="exercise"
        item={editingItem}
        items={exercises} // ← AQUI VAI LISTA DO BACKEND ✔
        onSubmit={handleSave}
      />
    </>
  );
};

export default ExerciseScreen;
