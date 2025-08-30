import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  date: Date;
  type: 'goal' | 'reminder' | 'other';
};

const NOTIFICATION_HISTORY_KEY = '@notification_history';

const saveNotificationToHistory = async (notification: NotificationRecord) => {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
    const history: NotificationRecord[] = existing ? JSON.parse(existing) : [];
    history.push(notification);
    await AsyncStorage.setItem(
      NOTIFICATION_HISTORY_KEY,
      JSON.stringify(history)
    );
  } catch (error) {
    console.error('Erro ao salvar notificação no histórico:', error);
  }
};

export const useNotifications = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      if (!Device.isDevice) {
        console.warn('Notificações só funcionam em dispositivos físicos.');
        return;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Permissão para notificações não concedida.');
        return;
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowInForeground: true,
          shouldShowList: true,
        }),
      });
    };

    setupNotifications();

    // Listener para quando a notificação for realmente recebida/disparada
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        const id = notification.request.identifier;
        const date = new Date();

        // Salva no histórico
        saveNotificationToHistory({
          id,
          title: title ?? '',
          body: body ?? '',
          date,
          type: 'other',
        });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const scheduleNotification = async (
    title: string,
    body: string,
    date: Date,
    type: 'goal' | 'reminder' | 'other' = 'other'
  ) => {
    if (!Device.isDevice) return;

    const triggerSeconds = (date.getTime() - Date.now()) / 1000;
    if (triggerSeconds <= 0) return;

    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default' },
      //@ts-ignore
      trigger: { seconds: triggerSeconds, repeats: false },
    });
  };

  const scheduleDailyNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    type: 'goal' | 'reminder' | 'other' = 'reminder'
  ) => {
    if (!Device.isDevice) return;

    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default' },
      //@ts-ignore
      trigger: { type: 'calendar', hour, minute, repeats: true },
    });
  };

  const getNotificationHistory = async (): Promise<NotificationRecord[]> => {
    try {
      const data = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao ler histórico de notificações:', error);
      return [];
    }
  };

  return {
    scheduleNotification,
    scheduleDailyNotification,
    getNotificationHistory,
  };
};
