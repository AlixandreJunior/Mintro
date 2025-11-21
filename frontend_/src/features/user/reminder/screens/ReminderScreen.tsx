// screens/NotificationScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';

import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import CreateNotificationModal from '@/features/user/reminder/components/ReminderCreateSection';

import { useReminder } from '@/features/user/reminder/hooks/useReminder';
import { useNotification } from '../hooks/useNotification';

const NotificationScreen = () => {
  const { scheduleOnce, scheduleDaily, cancel, list, update } =
    useNotification();

  const {
    handleReminderList,
    handleReminderCreate,
    handleReminderUpdate,
    handleReminderDelete,
  } = useReminder();

  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [editingNotification, setEditingNotification] = useState<any | null>(
    null
  );

  const typeLabels: Record<string, string> = {
    diario: 'Diário',
    objetivo: 'Objetivo',
    hidratacao: 'Hidratação',
    exercicio: 'Exercício',
    mindfulness: 'Mindfulness',
    outro: 'Outro',
  };

  const getTypeLabel = (t: string) => typeLabels[t] ?? t;

  const openModal = (n?: any) => {
    setEditingNotification(n ?? null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingNotification(null);
    setModalVisible(false);
  };

  const loadNotifications = async () => {
    const localList = await list();
    setNotifications(localList);
  };

  const handleSaveNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    daily: boolean,
    type: string
  ) => {
    try {
      const date = new Date();
      date.setHours(hour, minute, 0, 0);

      if (editingNotification) {
        await update(editingNotification.id, title, body, date, daily, type);
      } else {
        if (daily) {
          await scheduleDaily(title, body, hour, minute, type);
        } else {
          await scheduleOnce(title, body, date, type);
        }
      }

      await loadNotifications();
      closeModal();
    } catch (e) {
      console.error('Erro ao salvar notificação:', e);
    }
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      'Excluir notificação',
      'Tem certeza que deseja excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await cancel(item.id);
            await loadNotifications();
          },
        },
      ]
    );
  };

  // formato da data dentro da lista
  const formatNotificationDate = (n: any) => {
    const date = new Date(n.date);
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');

    return n.isDaily
      ? `Diária - ${hh}:${mm}`
      : `Única - ${date.toLocaleDateString()} ${hh}:${mm}`;
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithOptions
        title="Notificações"
        options={[{ label: 'Nova', onPress: () => openModal() }]}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.body}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {formatNotificationDate(item)}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: item.isDaily ? '#007AFF' : '#FF9500',
                    fontWeight: 'bold',
                  }}
                >
                  {item.isDaily ? 'DIÁRIA' : 'ÚNICA'}
                </Text>
              </View>

              <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                Tipo: {getTypeLabel(item.type)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="Editar" onPress={() => openModal(item)} />
              <Button title="Excluir" onPress={() => handleDelete(item)} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666' }}>Nenhuma notificação agendada</Text>
          </View>
        }
      />

      <CreateNotificationModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={handleSaveNotification}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
