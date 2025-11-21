import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BaseCard from '../../../../share/components/ui/card/BaseCard';
import { Hydration } from '@/share/types/health/hydratation';

interface Props {
  logs: Hydration[];
  dateLabel: string;
  loading: boolean;
  error: string | null;
}

export const HydrationHistory: React.FC<Props> = ({
  logs,
  dateLabel,
  error,
}) => {
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  if (logs.length === 0)
    return (
      <Text style={styles.noDataText}>Nenhum registro para essa data.</Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.date}>Data: {dateLabel}</Text>
      {logs.map((log, i) => (
        <BaseCard key={i} style={styles.historyCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardValue}>{log.quantity} ml</Text>
            <Text style={styles.cardCupsText}>
              {Math.round(log.quantity / 250)} copo(s)
            </Text>
          </View>
        </BaseCard>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginBottom: 100 },

  title: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 16,
  },

  mt20: { marginTop: 20 },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },

  historyCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardValue: {
    fontSize: 22,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
  },
  cardCupsText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
});
