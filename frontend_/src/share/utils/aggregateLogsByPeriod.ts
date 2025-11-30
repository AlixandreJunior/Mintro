type Period = 'day' | 'week' | 'month' | 'year';

interface PeriodConfig {
  length: number;
  getIndex: (date: Date) => number;
}

const periodConfig: Record<Period, PeriodConfig> = {
  day: {
    length: 24,
    getIndex: (d) => d.getHours(),
  },
  week: {
    length: 7,
    getIndex: (d) => d.getDay(),
  },
  month: {
    length: 31,
    getIndex: (d) => d.getDate() - 1,
  },
  year: {
    length: 12,
    getIndex: (d) => d.getMonth(),
  },
};

interface AggregateOptions<T> {
  logs: T[];
  period: Period;
  getDate: (item: T) => Date; // extrai a data
  getValue: (item: T) => number; // extrai o valor a ser somado
}

export function aggregateLogsByPeriod<T>({
  logs,
  period,
  getDate,
  getValue,
}: AggregateOptions<T>) {
  const config = periodConfig[period];
  if (!config) return [];

  const buckets = Array.from({ length: config.length }, () => 0);

  logs.forEach((log) => {
    const date = getDate(log);
    const index = config.getIndex(date);

    if (index >= 0 && index < buckets.length) {
      buckets[index] += getValue(log);
    }
  });

  return buckets.map((y, i) => ({
    x: i + 1,
    y,
  }));
}
