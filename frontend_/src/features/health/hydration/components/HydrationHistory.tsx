import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseCard from '../../../../share/components/ui/card/BaseCard';
import { Hydration } from '@/share/types/health/hydratation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  logs: Hydration[];
  dateLabel: string;
  mode: 'day' | 'week' | 'month' | 'year';
}

export const HydrationHistory: React.FC<Props> = ({
  logs,
  dateLabel,
  mode,
}) => {
  if (logs.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Nenhuma hidratação registrada.</Text>
        <Text style={styles.emptySubtitle}>
          Adicione sua primeira hidratação.
        </Text>
      </View>
    );

  // --- Agrupamento genérico ---
  const groupBy = (
    items: Hydration[],
    keyFn: (log: Hydration) => string
  ): Record<string, Hydration[]> =>
    items.reduce((acc, log) => {
      const key = keyFn(log);
      acc[key] = acc[key] ? [...acc[key], log] : [log];
      return acc;
    }, {} as Record<string, Hydration[]>);

  let grouped: Record<string, Hydration[]> = {};

  if (mode === 'day') {
    grouped = { [dateLabel]: logs };
  }
  if (mode === 'week') {
    grouped = groupBy(logs, (log) =>
      format(new Date(log.date), 'EEEE', { locale: ptBR }).replace(/^\w/, (c) =>
        c.toUpperCase()
      )
    );
  }
  if (mode === 'month') {
    grouped = groupBy(logs, (log) =>
      format(new Date(log.date), 'd', { locale: ptBR })
    );
  }
  if (mode === 'year') {
    grouped = groupBy(logs, (log) =>
      format(new Date(log.date), 'MMMM', { locale: ptBR }).replace(/^\w/, (c) =>
        c.toUpperCase()
      )
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.date}>Período: {dateLabel}</Text>

      {Object.entries(grouped).map(([label, items]) => {
        // total do grupo
        const total = items.reduce((sum, log) => sum + log.quantity, 0);

        return (
          <View key={label} style={{ marginBottom: 24 }}>
            {/* Cabeçalho do agrupamento */}
            {mode !== 'day' && (
              <Text style={styles.groupLabel}>
                {label} — {total} ml ({Math.round(total / 250)} copo(s))
              </Text>
            )}

            {/* Cards individuais */}
            {items.map((log, i) => (
              <BaseCard key={i} style={styles.historyCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardValue}>{log.quantity} ml</Text>

                  <Text style={styles.cardHour}>
                    {format(new Date(log.date), 'HH:mm')}
                  </Text>
                </View>

                <Text style={styles.cardCupsText}>
                  {Math.round(log.quantity / 250)} copo(s)
                </Text>
              </BaseCard>
            ))}
          </View>
        );
      })}
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

  groupLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#111',
    marginBottom: 8,
  },

  historyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardValue: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
  },
  cardHour: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  cardCupsText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
});
