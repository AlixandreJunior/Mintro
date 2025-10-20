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
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import CreateNotificationModal from '@/components/CreateNotificationScreen';
import {
  useNotifications,
  NotificationRecord,
  NotificationType,
} from '@/hooks/useNotifications';

const NotificationScreen = () => {
  const {
    scheduleNotification,
    scheduleDailyNotification,
    cancelNotification,
    getNotificationHistory,
  } = useNotifications();

  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [editingNotification, setEditingNotification] =
    useState<NotificationRecord | null>(null);

  // 🔹 Mapeamento automático dos tipos para português
  const getTypeLabel = (type: NotificationType): string => {
    const typeLabels: Record<NotificationType, string> = {
      diario: 'Diário',
      objetivo: 'Objetivo',
      hidratacao: 'Hidratação',
      exercicio: 'Exercício',
      mindfulness: 'Mindfulness',
      outro: 'Outro',
    };
    return typeLabels[type] || type;
  };

  const openModal = (notification?: NotificationRecord) => {
    setEditingNotification(notification ?? null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingNotification(null);
    setModalVisible(false);
  };

  const loadNotifications = async () => {
    const history = await getNotificationHistory();
    setNotifications(history);
  };

  const handleSaveNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    daily: boolean,
    type: NotificationType
  ) => {
    try {
      if (editingNotification) {
        await cancelNotification(editingNotification.id);
      }

      if (daily) {
        await scheduleDailyNotification(title, body, hour, minute, type);
      } else {
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        if (date <= new Date()) {
          date.setDate(date.getDate() + 1);
        }
        await scheduleNotification(title, body, date, type);
      }

      await loadNotifications();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar notificação:', error);
    }
  };

  const handleDelete = (item: NotificationRecord) => {
    Alert.alert(
      'Excluir notificação',
      'Tem certeza que deseja excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await cancelNotification(item.id);
            await loadNotifications();
          },
        },
      ]
    );
  };

  // 🔹 CORREÇÃO: Use a propriedade isDaily do NotificationRecord
  const formatNotificationDate = (notification: NotificationRecord): string => {
    const date = new Date(notification.date);

    if (notification.isDaily) {
      return `Diária - ${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `Única - ${date.toLocaleDateString()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
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
        renderItem={({ item }) => {
          return (
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
                  {/* 🔹 CORREÇÃO: Use a função getTypeLabel */}
                  Tipo: {getTypeLabel(item.type)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button title="Editar" onPress={() => openModal(item)} />
                <Button title="Excluir" onPress={() => handleDelete(item)} />
              </View>
            </View>
          );
        }}
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
