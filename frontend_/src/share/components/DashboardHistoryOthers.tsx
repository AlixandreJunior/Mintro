import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HealthCard from './HealthCard';
import { DashboardHistoryContainer } from './DashboardHistoryContainer';

interface DashboardHistoryOthersProps<T extends Record<string, any>> {
  data: {
    label: string;
    total: number;
  }[];
  un: string;
}

export function DashboardHistoryOthers<T extends Record<string, any>>({
  data,
  un,
}: DashboardHistoryOthersProps<T>) {
  return (
    <DashboardHistoryContainer>
      {data.map(({ label, total }, idx) => (
        <HealthCard style={styles.historyCard} key={idx}>
          <View style={styles.rowBetween}>
            <Text style={styles.groupLabel}>{label}</Text>
            <Text style={styles.cardValue}>
              {total.toLocaleString('pt-BR')} {un}
            </Text>
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
  dotsButton: { paddingHorizontal: 8, paddingVertical: 4 },
  dotsText: { fontSize: 24, fontWeight: 'bold' },
});
