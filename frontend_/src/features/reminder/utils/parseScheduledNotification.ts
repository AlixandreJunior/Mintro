import * as Notifications from 'expo-notifications';

export const parseScheduledNotification = (
  n: Notifications.NotificationRequest
) => {
  const trigger: any = n.trigger;
  const now = Date.now();
  let isDaily = false;
  let date = new Date();

  if (trigger?.type === 'calendar') {
    const {
      year,
      month,
      day,
      hour = 0,
      minute = 0,
      second = 0,
      repeats,
    } = trigger;

    if (repeats && typeof hour === 'number') {
      // Daily notification
      isDaily = true;
      date.setHours(hour, minute, 0, 0);
      if (date.getTime() <= now) date.setDate(date.getDate() + 1);
    } else {
      // One-time calendar notification
      date = new Date(
        year ?? date.getFullYear(),
        (month ?? date.getMonth() + 1) - 1,
        day ?? date.getDate(),
        hour,
        minute,
        second
      );
    }
  }
};
