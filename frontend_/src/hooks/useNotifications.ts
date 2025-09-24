// hooks/useNotifications.ts
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationRecord = {
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

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        const id = notification.request.identifier;
        const date = new Date();

        saveNotificationToHistory({
          id,
          title: title ?? '',
          body: body ?? '',
          date,
          type: 'other',
        });
      }
    );

    return () => subscription.remove();
  }, []);

  const scheduleNotification = async (
    title: string,
    body: string,
    date: Date,
    type: 'goal' | 'reminder' | 'other' = 'other'
  ) => {
    if (!Device.isDevice) return;

    const seconds = (date.getTime() - Date.now()) / 1000;
    if (seconds <= 0) return;

    const trigger: Notifications.TimeIntervalTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
    };

    const id = await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default', data: { type } },
      trigger,
    });

    saveNotificationToHistory({ id, title, body, date, type });
    return id;
  };

  const scheduleDailyNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    type: 'goal' | 'reminder' | 'other' = 'reminder'
  ) => {
    if (!Device.isDevice) return;

    const trigger: Notifications.CalendarNotificationTrigger = {
      type: 'calendar',
      dateComponents: {
        hour: hour,
        minute: minute,
        isLeapMonth: false,
      },
      repeats: true,
    };

    const id = await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default', data: { type } },
      //@ts-ignore
      trigger,
    });

    saveNotificationToHistory({ id, title, body, date: new Date(), type });
    return id;
  };

  const cancelNotification = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const getScheduledNotifications = async () => {
    return await Notifications.getAllScheduledNotificationsAsync();
  };

  const clearNotificationHistory = async () => {
    await AsyncStorage.removeItem(NOTIFICATION_HISTORY_KEY);
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
    cancelNotification,
    cancelAllNotifications,
    getScheduledNotifications,
    getNotificationHistory,
    clearNotificationHistory,
  };
};
