import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MoodPieChart from './MoodPieChart';

const { width, height } = Dimensions.get('window');

export default function MoodCountSection(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contagem de Humor</Text>
      <Text style={styles.sectionSubtitle}>Veja aqui a sua contagem de humor do mês</Text>
      <MoodPieChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2C3E50',
    marginBottom: height * 0.005,
  },
  sectionSubtitle: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_400Regular',
    color: '#7B7B7B',
    marginBottom: height * 0.02,
  },
});
