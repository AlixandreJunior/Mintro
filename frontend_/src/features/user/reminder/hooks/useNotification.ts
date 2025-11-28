import * as Notifications from 'expo-notifications';
import { parseScheduledNotification } from '../utils/parseScheduledNotification';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotification = () => {
  const scheduleOnce = async (
    title: string,
    body: string,
    date: Date,
    type: string
  ) => {
    const d = date.getTime() <= Date.now() ? new Date(Date.now() + 1000) : date;

    let trigger: Notifications.NotificationTriggerInput;

    if (Platform.OS === 'android') {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.ceil((d.getTime() - Date.now()) / 1000),
      };
    } else {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds(),
      };
    }

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { type, isDaily: false },
      },
      trigger,
    });
  };

  const scheduleDaily = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    type: string
  ) => {
    let trigger: Notifications.NotificationTriggerInput;

    if (Platform.OS === 'android') {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, 
        seconds: getNextDailySeconds(hour, minute),
        repeats: true,
      };
    } else {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR, 
        hour,
        minute,
        repeats: true,
      };
    }

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { type, isDaily: true },
      },
      trigger,
    });
  };

  const cancel = (id: string) =>
    Notifications.cancelScheduledNotificationAsync(id);

  const list = async () => {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled.map(parseScheduledNotification);
  };

  const update = async (
    id: string,
    title: string,
    body: string,
    date: Date,
    isDaily: boolean,
    type: string
  ) => {
    await cancel(id);
    return isDaily
      ? scheduleDaily(title, body, date.getHours(), date.getMinutes(), type)
      : scheduleOnce(title, body, date, type);
  };

  return {
    scheduleOnce,
    scheduleDaily,
    cancel,
    list,
    update,
  };
};

const getNextDailySeconds = (hour: number, minute: number) => {
  const now = new Date();
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  return Math.ceil((next.getTime() - now.getTime()) / 1000);
};
