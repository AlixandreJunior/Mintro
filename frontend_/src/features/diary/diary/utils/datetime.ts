export const extractDate = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const extractTime = (date: Date): string => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const extractTimeAsDate = (date: Date): Date => {
  const d = new Date(date);
  const t = new Date();
  t.setHours(d.getHours(), d.getMinutes(), 0, 0);
  return t;
};

export const combineDateAndTime = (date: Date, time: Date | string): Date => {
  const d = new Date(date);

  if (typeof time === 'string') {
    const [hours, minutes] = time.split(':').map(Number);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }

  d.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return d;
};
