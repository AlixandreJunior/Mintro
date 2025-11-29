import React from 'react';
import {
  buildWeekData,
  buildMonthData,
  buildYearData,
} from '@/share/utils/dashboardHistory';
import { DashboardHistoryDay } from './DashboardHistoryDay';
import { DashboardHistoryOthers } from './DashboardHistoryOthers';
import { ResponseSuccess } from '../types/response';

interface DashboardHistoryProps<T extends Record<string, any>> {
  logs: T[];
  dateLabel: string;
  mode: 'day' | 'week' | 'month' | 'year';
  selectedDate: Date;
  valueKey: keyof T;
  dateKey: keyof T;
  un: string;
  onEdit?: (log: T) => Promise<any> | void;
  onDelete?: (id: number) => Promise<any>;
}

export function DashboardHistory<T extends Record<string, any>>({
  logs,
  mode,
  selectedDate,
  valueKey,
  dateKey,
  un,
  onEdit,
  onDelete,
}: DashboardHistoryProps<T>) {
  const data =
    mode === 'week'
      ? buildWeekData(logs, selectedDate, valueKey, dateKey)
      : mode === 'month'
      ? buildMonthData(logs, selectedDate, valueKey, dateKey)
      : buildYearData(logs, selectedDate, valueKey, dateKey);

  if (mode === 'day' && onDelete && onEdit) {
    return (
      <DashboardHistoryDay
        logs={logs}
        onDelete={onDelete}
        onEdit={onEdit}
        valueKey={valueKey}
      />
    );
  }

  return <DashboardHistoryOthers data={data} un={un} />;
}
