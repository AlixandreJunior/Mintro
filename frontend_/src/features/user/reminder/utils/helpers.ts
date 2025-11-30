import { useCallback } from 'react';

export const TYPE_LABELS: Record<string, string> = {
  DI: 'Diário',
  OB: 'Objetivo',
  HD: 'Hidratação',
  EX: 'Exercício',
  MD: 'Mindfulness',
  OT: 'Outro',
};

export const getTypeLabel = (type: string) => TYPE_LABELS[type] ?? type;

export const formatReminderDate = (reminder: {
  deadline: string;
  time: string;
}) => `${reminder.time}`;

export const useLoadReminders = (handleReminderList: () => Promise<any[]>) =>
  useCallback(
    async (setReminders: (reminders: any[]) => void) => {
      const data = await handleReminderList();
      setReminders(data ?? []);
    },
    [handleReminderList]
  );

export const openModal = (
  setEditingReminder: (r: any) => void,
  setModalVisible: (v: boolean) => void,
  reminder?: any
) => {
  setEditingReminder(reminder ?? null);
  setModalVisible(true);
};

export const closeModal = (
  setEditingReminder: (r: any) => void,
  setModalVisible: (v: boolean) => void
) => {
  setEditingReminder(null);
  setModalVisible(false);
};
