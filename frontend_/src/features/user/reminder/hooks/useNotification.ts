import * as Notifications from 'expo-notifications';
import { parseScheduledNotification } from '../utils/parseScheduledNotification';

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
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { type, isDaily: false },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds(),
      },
    });
  };

  const scheduleDaily = (
    title: string,
    body: string,
    hour: number,
    minute: number,
    type: string
  ) => {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { type, isDaily: true },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour,
        minute,
        repeats: true,
      },
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
