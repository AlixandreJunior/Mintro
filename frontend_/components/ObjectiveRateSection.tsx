import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ObjectiveRateSectionProps {
  week_count: number;
  success_rate_avarege: number; // número de vezes cumpridas na semana atual
  repeat: number; // número de vezes que deveria repetir na semana
}

const ObjectiveRateSection: React.FC<ObjectiveRateSectionProps> = ({
  week_count,
  repeat,
  success_rate_avarege,
}) => {
  const currentWeekRate =
    repeat > 0 ? Math.min(100, Math.round((week_count / repeat) * 100)) : 0;
  const previousWeeksRate = 75;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Taxa de Sucesso</Text>

        <View style={styles.innerContainer}>
          <View style={styles.rateBox}>
            <Text style={styles.rateValue}>{currentWeekRate}%</Text>
            <Text style={styles.rateLabel}>Esta Semana</Text>
          </View>

          <View style={styles.rateBox}>
            <Text style={styles.rateValue}>{success_rate_avarege}%</Text>
            <Text style={styles.rateLabel}>Semanas Anteriores</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  container: {
    width: width * 0.9,
    height: height * 0.19,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderColor: '#F3F4F6',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: width * 0.05,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    lineHeight: width * 0.06,
    marginBottom: height * 0.015,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateBox: {
    width: width * 0.4,
    height: height * 0.095,
    backgroundColor: '#FFFFFF',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.015,
  },
  rateValue: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: height * 0.005,
  },
  rateLabel: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins_300Light',
    color: '#000',
    lineHeight: width * 0.045,
    textAlign: 'center',
  },
});

export default ObjectiveRateSection;
