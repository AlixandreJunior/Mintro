import { useEffect, useState, useMemo, ReactNode } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { Diary } from '@/types/mental/diary';
import { getDiaryList } from '@/services/diary/listDiary';
import { getDiary } from '@/services/diary/getDiary';
import { createDiary } from '@/services/diary/createDiary';
import { updateDiary } from '@/services/diary/updateDiary';
import { deleteDiary } from '@/services/diary/deleteDiary';
import { appendImageToFormData } from '@/utils/appendImageToFormData';
import { getMoodVisuals } from '@/utils/moodHelper';
import { getActivityIconName } from '@/utils/activityIconMapper';

export interface TransformedActivity {
  name: string;
  iconName?: ReactNode;
}

export interface DiaryEntryCardProps {
  id: number;
  time: string;
  mood: string;
  iconSource: any;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

export interface AdaptedDiaryHistory {
  date: string;
  entries: DiaryEntryCardProps[];
}

export function useDiaryManager(initialDate: Date) {
  const getCombinedDateTime = (date: Date, time: Date) =>
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

  const loadDiaryById = async (id: number): Promise<Partial<Diary> | null> => {
    try {
      const diary: Diary = await getDiary(id);
      return {
        title: diary.title,
        content: diary.content,
        mood: diary.mood,
        activities: Array.isArray(diary.activities)
          ? diary.activities.map((act: any) =>
              typeof act === 'number' ? act : act.id
            )
          : [],
        datetime: diary.datetime ? new Date(diary.datetime) : new Date(),
        photo: diary.photo,
      };
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao carregar diário');
      console.error('Erro ao carregar diário:', error);
      return null;
    }
  };

  const handleSave = async (form: {
    title: string;
    notes: string;
    selectedDate: Date;
    selectedTime: Date;
    selectedMoodId: string;
    selectedActivitiesIds: string[];
    selectedImageUri: string | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.notes);
      formData.append(
        'datetime',
        getCombinedDateTime(form.selectedDate, form.selectedTime).toISOString()
      );
      formData.append('mood', form.selectedMoodId);
      form.selectedActivitiesIds.forEach((id) =>
        formData.append('activity', id)
      );
      await appendImageToFormData(formData, form.selectedImageUri);

      await createDiary(formData);
      Alert.alert('Sucesso', 'Diário criado com sucesso!');
      router.replace('/(app)/(tabs)/mental');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar diário.');
      console.error('Erro ao criar diário:', error);
    }
  };

  const handleUpdate = async (
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
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.notes);
      formData.append(
        'datetime',
        getCombinedDateTime(form.selectedDate, form.selectedTime).toISOString()
      );
      formData.append('mood', form.selectedMoodId);
      form.selectedActivitiesIds.forEach((id) =>
        formData.append('activity', id)
      );
      await appendImageToFormData(formData, form.selectedImageUri);

      await updateDiary(id, formData);
      Alert.alert('Sucesso', 'Diário atualizado com sucesso!');
      router.replace('/(app)/(tabs)/mental');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar diário.');
      console.error('Erro ao atualizar diário:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDiary(id);
      Alert.alert('Sucesso', 'Diário deletado com sucesso!');
      router.replace('/(app)/(tabs)/mental');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao deletar diário.');
      console.error('Erro ao deletar diário:', error);
    }
  };

  const getDiaryHistory = async (
    date: Date
  ): Promise<AdaptedDiaryHistory[]> => {
    try {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const diaries: Diary[] = await getDiaryList(month, year);

      const today = new Date().toDateString();
      const groupedByDate: Record<string, DiaryEntryCardProps[]> = {};

      diaries.forEach((diary) => {
        const entryDate = new Date(diary.datetime);
        const formattedDate = entryDate.toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
        });
        const displayDate =
          entryDate.toDateString() === today
            ? 'Hoje, ' + formattedDate
            : formattedDate;

        const moodVisuals = getMoodVisuals(diary.mood);

        const transformedActivities: TransformedActivity[] =
          diary.activities.map((activity) => ({
            name: activity.name,
            iconName: getActivityIconName(activity.name),
          }));

        const transformedEntry: DiaryEntryCardProps = {
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

        if (!groupedByDate[displayDate]) groupedByDate[displayDate] = [];
        groupedByDate[displayDate].push(transformedEntry);
      });

      return Object.entries(groupedByDate).map(([date, entries]) => ({
        date,
        entries,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar histórico de diários:', error);
      return [];
    }
  };

  return {
    loadDiaryById,
    handleSave,
    handleUpdate,
    handleDelete,
    getDiaryHistory,
  };
}
