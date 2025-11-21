import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { QuantityCounter } from '../../../../share/components/specific/QuantityCounter';
import BaseCard from '../../../../share/components/ui/card/BaseCard';

interface QuantitySelectorProps {
  quantities: Record<number, number>;
  onQuantityChange: (volume: number, quantity: number) => void;
}

const VOLUMES = [250, 500, 750, 1000] as const;

const LABELS: Record<number, string> = {
  250: 'Copo',
  500: 'Garrafa Pequena',
  750: 'Garrafa Média',
  1000: 'Garrafa Grande',
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantities,
  onQuantityChange,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Escolha uma opção ou adicione uma personalizada
      </Text>
      <BaseCard style={styles.optionsCard}>
        {VOLUMES.map((vol, i) => (
          <React.Fragment key={vol}>
            <QuantityCounter
              label={LABELS[vol]}
              volume={vol}
              onQuantityChange={onQuantityChange}
              initialQuantity={quantities[vol]}
            />
            {i < VOLUMES.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </BaseCard>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginVertical: 10 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 2,
  },
  optionsCard: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 6,
  },
});
