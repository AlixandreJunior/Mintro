// hooks/useNotifications.ts
import * as Notifications from 'expo-notifications';

export type NotificationType =
  | 'diario'
  | 'objetivo'
  | 'hidratacao'
  | 'exercicio'
  | 'mindfulness'
  | 'outro';

export type NotificationRecord = {
  id: string;
  title: string;
  body: string;
  date: string; // ISO
  type: NotificationType;
  isDaily: boolean;
};

// Configurar o handler de notificações corretamente
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  // 1. 🔹 Criar notificação única
  const scheduleNotification = async (
    title: string,
    body: string,
    date: Date,
    type: NotificationType
  ): Promise<string> => {
    const now = new Date();

    // Se a data for no passado, adiciona 1 segundo
    if (date <= now) {
      date = new Date(now.getTime() + 1000);
    }

    const seconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type, isDaily: false },
        sound: true,
      },
      trigger: {
        type: 'timeInterval',
        seconds: seconds > 0 ? seconds : 1,
      } as Notifications.TimeIntervalTriggerInput,
    });
    return id;
  };

  // 2. 🔹 Criar notificação diária
  const scheduleDailyNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    type: NotificationType
  ): Promise<string> => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type, isDaily: true },
        sound: true,
      },
      trigger: {
        type: 'daily',
        hour,
        minute,
        repeats: true,
      } as Notifications.DailyTriggerInput,
    });
    return id;
  };

  // 3. 🔹 Cancelar notificação
  const cancelNotification = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  };

  // 4. 🔹 Listar todas as notificações (histórico)
  const getNotificationHistory = async (): Promise<NotificationRecord[]> => {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();

    return scheduled.map((n) => {
      let triggerDate = new Date();
      const trigger = n.trigger as any;
      let isDaily = false;

      // Detecta se é diária corretamente
      if (trigger.type === 'daily') {
        isDaily = true;
        triggerDate.setHours(trigger.hour, trigger.minute, 0, 0);
        if (triggerDate <= new Date()) {
          triggerDate.setDate(triggerDate.getDate() + 1);
        }
      } else if (trigger.type === 'date' && trigger.timestamp) {
        isDaily = false;
        triggerDate = new Date(trigger.timestamp);
      } else if (trigger.type === 'timeInterval' && trigger.seconds) {
        isDaily = false;
        triggerDate = new Date(Date.now() + trigger.seconds * 1000);
      } else if (trigger.timestamp) {
        isDaily = false;
        triggerDate = new Date(trigger.timestamp);
      }

      // Prioriza a informação do data.isDaily se existir
      const dataIsDaily = n.content.data?.isDaily as boolean;
      if (dataIsDaily !== undefined) {
        isDaily = dataIsDaily;
      }

      return {
        id: n.identifier,
        title: n.content.title || '',
        body: n.content.body || '',
        date: triggerDate.toISOString(),
        type: (n.content.data?.type as NotificationType) || 'outro',
        isDaily,
      };
    });
  };

  // 5. 🔹 Atualizar notificação
  const updateNotification = async (
    id: string,
    title: string,
    body: string,
    date: Date,
    daily: boolean,
    type: NotificationType
  ): Promise<string> => {
    await cancelNotification(id);

    if (daily) {
      return await scheduleDailyNotification(
        title,
        body,
        date.getHours(),
        date.getMinutes(),
        type
      );
    } else {
      return await scheduleNotification(title, body, date, type);
    }
  };

  return {
    scheduleNotification,
    scheduleDailyNotification,
    cancelNotification,
    getNotificationHistory,
    updateNotification,
  };
};
