import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ObjectiveFooterProps {
  createdAt: string; // string em formato de data
}

const ObjectiveFooter: React.FC<ObjectiveFooterProps> = ({ createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data de Início</Text>
      <Text style={styles.value}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 140,
    alignSelf: 'center',
    marginTop: 16,
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});

export default ObjectiveFooter;
