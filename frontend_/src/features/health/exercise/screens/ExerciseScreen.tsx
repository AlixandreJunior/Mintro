import React, { useEffect, useState } from 'react';
import ActivityScreenTemplate from '@/share/components/ActivityScreenTemplate';
import { router } from 'expo-router';
import { useExercise } from '../hooks/useExercise';
import ActivityEditModal from '@/share/components/ActivityEditModal';
import { Exercise } from '@/share/types/health/exercise';
import { useToast } from '@/share/providers/ToastProvider';

const ExerciseScreen = () => {
  const title = 'Atividade';
  const type = 'exercise';

  const {
    handleExerciseList,
    handleExerciseLogDelete,
    handleExerciseLogUpdate,
  } = useExercise();

  const { showToast } = useToast();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const loadExercises = async () => {
    try {
      const data = await handleExerciseList();
      setExercises(data);
    } catch (err) {
      console.error(err);
      showToast('Erro ao carregar exercícios', 'error');
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const handlePress = () => {
    router.push('./exercises/register');
  };

  const handleEdit = (id: number) => {
    setEditingItem(id);
    setModalVisible(true);
  };

  const handleSave = async (updatedData: any) => {
    try {
      await handleExerciseLogUpdate(updatedData.id, updatedData);
      showToast('Exercício atualizado com sucesso!', 'success');
      setModalVisible(false);
      setEditingItem(null);
      loadExercises(); // 🔹 recarrega lista
    } catch (err) {
      console.error(err);
      showToast('Erro ao atualizar exercício', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await handleExerciseLogDelete(id);
      showToast('Exercício deletado com sucesso!', 'success');
      loadExercises();
    } catch (err) {
      console.error(err);
      showToast('Erro ao deletar exercício', 'error');
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
        type="exercise"
        item={editingItem}
        items={exercises}
        onSubmit={handleSave}
      />
    </>
  );
};

export default ExerciseScreen;
