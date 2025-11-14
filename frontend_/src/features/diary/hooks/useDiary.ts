import { useState, useCallback } from 'react';
import { router } from 'expo-router';

import { Diary } from '@/share/types/mental/diary';
import { appendImageToFormData } from '@/share/utils/appendImageToFormData';
import { getMoodVisuals } from '@/share/utils/moodHelper';
import { getActivityIconName } from '@/share/utils/activityIconMapper';
import { useHandleRequest } from '@/share/hooks/useHandleRequest';

export const useDiary = () => {
  const {handleRequest, error, loading} = useHandleRequest()

  const buildFormData = async (form: {
    title: string;
    notes: string;
    selectedDate: Date;
    selectedTime: Date;
    selectedMoodId: string;
    selectedActivitiesIds: string[];
    selectedImageUri: string | null;
  }) => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.notes);
    formData.append(
      'datetime',
      getCombinedDateTime(form.selectedDate, form.selectedTime).toISOString()
    );
    formData.append('mood', form.selectedMoodId);
    form.selectedActivitiesIds.forEach((id) => formData.append('activity', id));
    await appendImageToFormData(formData, form.selectedImageUri);
    return formData;
  };

  const loadDiaryById[] = useCallback(
    async (id: number): Promise<Partial<Diary> | null> => {
      try {
        const diary = await getDiary(id);
        return {
          title: diary.title,
          content: diary.content,
          mood: diary.mood,
          activities: Array.isArray(diary.activities)
            ? diary.activities.map((act: number | { id: number }) =>
                typeof act === 'number' ? act : act.id
              )
            : [],
          datetime: diary.datetime ? new Date(diary.datetime) : new Date(),
          photo: diary.photo,
        };
      } catch (err) {
        console.error('Erro ao carregar diário:', err);
        throw err;
      }
    },
    []
  );

  const handleSave = useCallback(
    async (form: {
      title: string;
      notes: string;
      selectedDate: Date;
      selectedTime: Date;
      selectedMoodId: string;
      selectedActivitiesIds: string[];
      selectedImageUri: string | null;
    }) => {
      setSaving(true);
      try {
        const formData = await buildFormData(form);
        await createDiary(formData);
        router.replace('/(app)/(tabs)/mental');
      } catch (err) {
        console.error('Erro ao criar diário:', err);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const handleUpdate = useCallback(
    async (
      id: number,
      form: {
        title: string;
        notes: string;
        selectedDate: Date;
        selectedTime: Date;
        selectedMoodId: string;
        selectedActivitiesIds: string[];
        selectedImageUri: string | null;
      }
    ) => {
      setSaving(true);
      try {
        const formData = await buildFormData(form);
        await updateDiary(id, formData);
        router.replace('/(app)/(tabs)/mental');
      } catch (err) {
        console.error('Erro ao atualizar diário:', err);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: number) => {
    setSaving(true);
    try {
      await deleteDiary(id);
      router.replace('/(app)/(tabs)/mental');
    } catch (err) {
      console.error('Erro ao deletar diário:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const transformDiaryToCard = (diary: Diary): DiaryEntryCardProps => {
    const entryDate = new Date(diary.datetime);
    const moodVisuals = getMoodVisuals(diary.mood);
    const transformedActivities: TransformedActivity[] = diary.activities.map(
      (activity) => ({
        name: activity.name,
        iconName: getActivityIconName(activity.name),
      })
    );

    return {
      id: diary.id,
      time: entryDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      mood: diary.mood,
      iconSource: moodVisuals.iconSource,
      activities: transformedActivities,
      title: diary.title || 'Sem Título',
      content: diary.content,
      photoUrl: diary.photo,
    };
  };

  const getDiaryHistory = useCallback(
    async (date: Date): Promise<AdaptedDiaryHistory[]> => {
      try {
        setLoading(true);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const diaries = await getDiaryList(month, year);

        const today = new Date().toDateString();
        const grouped = diaries.reduce(
          (acc: Record<string, DiaryEntryCardProps[]>, diary) => {
            const entryDate = new Date(diary.datetime);
            const formattedDate = entryDate.toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
            });
            const displayDate =
              entryDate.toDateString() === today
                ? 'Hoje, ' + formattedDate
                : formattedDate;

            if (!acc[displayDate]) acc[displayDate] = [];
            acc[displayDate].push(transformDiaryToCard(diary));
            return acc;
          },
          {}
        );

        return Object.entries(grouped).map(([date, entries]) => ({
          date,
          entries,
        }));
      } catch (err) {
        console.error('Erro ao buscar histórico de diários:', err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loadDiaryById,
    handleSave,
    handleUpdate,
    handleDelete,
    getDiaryHistory,
    loading,
    saving,
  };
}
