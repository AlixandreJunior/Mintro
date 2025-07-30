import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const getWeekRange = (): { start: string; end: string; endDate: Date } => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // segunda
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay())); // domingo

  const formatDate = (date: Date) =>
    date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
    });

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
    endDate: endOfWeek,
  };
};

const { endDate } = getWeekRange();
const today = new Date();
const diffInTime = endDate.getTime() - today.getTime();
const daysRemaining = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

interface ProgressCardProps {
  current: number;
  total: number;
}

const ObjectiveProgressCard: React.FC<ProgressCardProps> = ({
  current,
  total,
}) => {
  const { start, end } = getWeekRange();

  const objectiveProgress = {
    current: current,
    total: total,
    description: 'para alcançar a meta',
    periodStart: start,
    periodEnd: end,
    daysRemaining: daysRemaining,
  };

  const cardWidth = 220;
  const paddingHorizontal = 20 * 2;
  const iconSize = 20;
  const availableWidth = cardWidth - paddingHorizontal;
  const iconsTotalWidth = objectiveProgress.total * iconSize;
  const spacesCount = objectiveProgress.total - 1;
  const gap =
    spacesCount > 0 ? (availableWidth - iconsTotalWidth) / spacesCount : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.progressTitle}>
          {objectiveProgress.current} de {objectiveProgress.total}
        </Text>

        <View style={styles.iconsRow}>
          {[...Array(objectiveProgress.total)].map((_, index) => (
            <MaterialCommunityIcons
              key={index}
              name={
                index < objectiveProgress.current ? 'check-circle' : 'circle'
              }
              size={iconSize}
              color={index < objectiveProgress.current ? '#57E571' : '#D9D9D9'}
              style={{ marginHorizontal: gap / 2 }}
            />
          ))}
        </View>

        <Text style={styles.progressDescription}>
          {objectiveProgress.total - objectiveProgress.current > 0
            ? `${objectiveProgress.total - objectiveProgress.current} ${
                objectiveProgress.description
              }`
            : 'Parabéns! Você alcançou a meta desta semana 🎉'}
        </Text>

        <View style={styles.separator} />

        <View style={styles.footer}>
          <Text style={styles.periodText}>
            {objectiveProgress.periodStart} - {objectiveProgress.periodEnd}
          </Text>
          <Text style={styles.daysRemainingText}>
            {objectiveProgress.daysRemaining} dias restantes
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginVertical: height * 0.01,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.05,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  progressTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: 'row',
    width: '50%',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    marginBottom: 10,
  },
  progressDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#0C0C0C',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  periodText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#0C0C0C',
  },
  daysRemainingText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#0C0C0C',
  },
});

export default ObjectiveProgressCard;
