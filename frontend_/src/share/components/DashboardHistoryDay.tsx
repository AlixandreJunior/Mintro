import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import HealthCard from './HealthCard';
import { getValue } from '../utils/dashboardHistory';
import { DashboardHistoryContainer } from './DashboardHistoryContainer';
import { ResponseSuccess } from '../types/response';
import CardActions from './CardActions';

const { width } = Dimensions.get('window');

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
  container: { paddingHorizontal: width * 0.05, marginBottom: 100 },
  title: {
    fontSize: width * 0.04, // ajusta de acordo com a largura da tela
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginBottom: width * 0.02,
  },
  groupLabel: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    flexShrink: 1, // evita que quebre a linha
  },
  historyCard: {
    padding: width * 0.03,
    marginBottom: width * 0.015,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardValue: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    color: '#111',
  },
  dotsButton: {
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.005,
  },
  dotsText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
});
