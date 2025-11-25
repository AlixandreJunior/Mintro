import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HealthCard from './HealthCard';
import EditDeleteModal from './EditDeleteModal';
import { getValue } from '../utils/dashboardHistory';
import { DashboardHistoryContainer } from './DashboardHistoryContainer';
import { useHydration } from '@/features/health/hydration/hooks/useHydration';
import { ResponseSuccess } from '../types/response';
import CardActions from './CardActions';

interface DashboardHistoryDayProps<T extends Record<string, any>> {
  logs: T[];
  valueKey: keyof T;
  onEdit: (log: T) => void;
  onDelete: (id: number) => Promise<ResponseSuccess>;
}

export function DashboardHistoryDay<T extends Record<string, any>>({
  logs,
  valueKey,
  onEdit,
  onDelete,
}: DashboardHistoryDayProps<T>) {
  return (
    <DashboardHistoryContainer>
      {logs.map((log, idx) => (
        <HealthCard key={idx} style={styles.historyCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.groupLabel}>
              {getValue(log, valueKey).toLocaleString('pt-BR')} ml
            </Text>

            <CardActions
              onEdit={() => onEdit(log)}
              onDelete={() => onDelete(log.id)}
            />
          </View>
        </HealthCard>
      ))}
    </DashboardHistoryContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginBottom: 100 },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: 8,
  },
  groupLabel: { fontSize: 14, fontFamily: 'Poppins_500Medium' },
  historyCard: { padding: 16, marginBottom: 8 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardValue: { fontSize: 14, fontFamily: 'Poppins_500Medium', color: '#111' },
  dotsButton: { paddingHorizontal: 8, paddingVertical: 2 },
  dotsText: { fontSize: 24, fontWeight: 'bold' },
});
