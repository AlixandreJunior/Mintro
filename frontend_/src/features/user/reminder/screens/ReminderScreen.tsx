import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import CreateNotificationModal from '@/features/user/reminder/components/ReminderCreateSection';
import { useReminder } from '@/features/user/reminder/hooks/useReminder';
import { useNotification } from '../hooks/useNotification';
import {
  useLoadReminders,
  openModal,
  closeModal,
} from '@/features/user/reminder/utils/helpers';
import ReminderCard from '../components/ReminderCard';

const ReminderScreen = () => {
  const { scheduleOnce, scheduleDaily, cancel } = useNotification();
  const {
    handleReminderList,
    handleReminderCreate,
    handleReminderUpdate,
    handleReminderDelete,
  } = useReminder();

  const [modalVisible, setModalVisible] = useState(false);
  const [reminders, setReminders] = useState<any[]>([]);
  const [editingReminder, setEditingReminder] = useState<any | null>(null);

  const loadReminders = useLoadReminders(handleReminderList);

  useEffect(() => {
    loadReminders(setReminders);
  }, []);

  const handleDelete = async (item: any) => {
    try {
      if (item.local_notification_id) await cancel(item.local_notification_id);
      await handleReminderDelete(item.id);
      loadReminders(setReminders);
    } catch (e) {
      console.error('Erro ao excluir lembrete:', e);
    }
  };

  const handleSave = async (data: {
    title: string;
    content: string;
    date: string;
    time: string;
    is_daily: boolean;
    type: string;
    deadline?: string | null;
  }) => {
    try {
      const [hour, minute] = data.time.split(':').map(Number);
      const dateObj = new Date(`${data.date}T${data.time}`);

      const payload = {
        title: data.title,
        content: data.content,
        type: data.type,
        date: data.date,
        time: data.time,
        is_daily: data.is_daily,
        deadline: data.deadline ?? null,
      };

      let reminder;
      if (!editingReminder) {
        reminder = await handleReminderCreate(payload);
      } else {
        reminder = await handleReminderUpdate(editingReminder.id, payload);
        if (editingReminder.local_notification_id)
          await cancel(editingReminder.local_notification_id);
      }

      const localId = data.is_daily
        ? await scheduleDaily(data.title, data.content, hour, minute, data.type)
        : await scheduleOnce(data.title, data.content, dateObj, data.type);

      (reminder as any).local_notification_id = localId;

      loadReminders(setReminders);
      closeModal(setEditingReminder, setModalVisible);
    } catch (e) {
      console.error('Erro ao salvar notificação:', e);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ReminderCard
        title={item.title}
        date={item.date}
        time={item.time}
        isDaily={item.is_daily}
        type={item.type}
        onEdit={() => openModal(setEditingReminder, setModalVisible, item)}
        onDelete={() => handleDelete(item)}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 12 }}>
      <HeaderWithOptions
        title="Lembretes"
        options={[
          {
            label: 'Novo',
            onPress: () => openModal(setEditingReminder, setModalVisible),
          },
        ]}
      />
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 4 }}
      />

      <CreateNotificationModal
        visible={modalVisible}
        onClose={() => closeModal(setEditingReminder, setModalVisible)}
        onSave={handleSave}
        notification={editingReminder}
      />
    </SafeAreaView>
  );
};

export default ReminderScreen;
