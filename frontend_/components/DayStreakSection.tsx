import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type DayOfWeek = 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';

interface DayStreak {
  day: DayOfWeek | string;
  isCompleted: boolean;
  value?: number;
}

interface DayStreakSectionProps {
  data: DayStreak[];
}

export default function DayStreakSection({ data }: DayStreakSectionProps): React.JSX.Element {
  const itemWidth = width * 0.92 / 6;

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Dias seguidos</Text>

      <View style={styles.dayStreakContainer}>
        <View style={styles.connectorLine} />

        {data.slice(0, 5).map((day, i) => (
          <View key={i} style={[styles.dayItemWrapper, { width: itemWidth }]}>
            <View style={styles.dayCircle}>
              <Text style={styles.dayPlusSign}>+</Text>
            </View>
            <Text style={styles.dayLabel}>{day.day}</Text>
          </View>
        ))}

        <View style={[styles.dayItemWrapper, { width: itemWidth }]}>
          <View style={styles.dayOvalCurrent}>
            <Text style={styles.dayNumberCurrent}>1</Text>
          </View>
          <Text style={styles.dayLabel}>Hoje</Text>
        </View>
      </View>

      <View style={styles.separatorLine} />
      <View style={styles.streakInfo}>
        <MaterialCommunityIcons name="leaf" size={width * 0.05} color="#00CC3D" />
        <Text style={styles.streakText}>Maior Sequência: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 16,
    marginHorizontal: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    padding: width * 0.04,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginBottom: height * 0.015,
  },
  dayStreakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: height * 0.02,
  },
  connectorLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#D9D9D9',
    left: '4%',
    right: '4%',
    top: width * 0.08 / 2,
    zIndex: 0,
  },
  dayItemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dayCircle: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: (width * 0.08) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.005,
    zIndex: 1,
  },
  dayOvalCurrent: {
    width: width * 0.15,
    height: width * 0.10,
    borderRadius: (width * 0.12) / 2,
    backgroundColor: '#FBFBFB',
    borderColor: '#9CA3AF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.005,
    zIndex: 1,
  },
  dayPlusSign: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#9CA3AF',
  },
  dayNumberCurrent: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
  },
  dayLabel: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textAlign: 'center',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#D9D9D9',
    width: '100%',
    alignSelf: 'center',
    marginBottom: height * 0.015,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  streakText: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#0C0C0C',
    marginLeft: 5,
  },
});
