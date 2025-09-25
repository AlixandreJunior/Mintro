import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import NotificationModal from '@/components/NotificationModal';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationScreen = () => {
  const {
    scheduleDailyNotification,
    getScheduledNotifications,
    cancelNotification,
  } = useNotifications();

  const [modalVisible, setModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [scheduled, setScheduled] = useState<any[]>([]);

  const openCreateModal = () => setModalVisible(true);
  const closeCreateModal = () => setModalVisible(false);
  const openListModal = () => setListModalVisible(true);
  const closeListModal = () => setListModalVisible(false);

  const handleAddNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number
  ) => {
    await scheduleDailyNotification(title, body, hour, minute, 'reminder');
    const all = await getScheduledNotifications();
    setScheduled(all);
    closeCreateModal();
  };

  const handleDelete = async (id: string) => {
    await cancelNotification(id);
    const all = await getScheduledNotifications();
    setScheduled(all);
  };

  const handleEdit = async (item: any) => {
    await cancelNotification(item.identifier);
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      const all = await getScheduledNotifications();
      setScheduled(all);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithOptions
        title="Notificações"
        options={[
          { label: 'Nova', onPress: openCreateModal },
          { label: 'Gerenciar', onPress: openListModal },
        ]}
      />

      <NotificationModal
        visible={listModalVisible}
        onClose={closeListModal}
        notifications={scheduled}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
