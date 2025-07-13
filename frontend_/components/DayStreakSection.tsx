// components/DayStreakSection.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Tipagens movidas para cá
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
  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    Alert.alert('Navegação', `Navegar para ${direction === 'prev' ? 'Mês Anterior' : 'Próximo Mês'}`);
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.dayStreakContainer}>
        <TouchableOpacity onPress={() => handleMonthNavigation('prev')}>
          <MaterialCommunityIcons name="chevron-left" size={width * 0.07} color="#333" />
        </TouchableOpacity>
        {data.map((day, i) => (
          <View
            key={i}
            style={[
              styles.dayCircle,
              day.isCompleted ? styles.dayCircleCompleted : styles.dayCirclePending,
              day.day === 'Hoje' && styles.dayCircleCurrent,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                day.isCompleted ? styles.dayTextCompleted : styles.dayTextPending,
                day.day === 'Hoje' && styles.dayTextCurrent,
              ]}
            >
              {day.value !== undefined ? day.value : day.day}
            </Text>
          </View>
        ))}
        <TouchableOpacity onPress={() => handleMonthNavigation('next')}>
          <MaterialCommunityIcons name="chevron-right" size={width * 0.07} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.streakInfo}>
        <MaterialCommunityIcons name="leaf" size={width * 0.05} color="#4CAF50" />
        <Text style={styles.streakText}>Maior Sequência: 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dayStreakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  dayCircle: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 5,
  },
  dayCircleCompleted: {
    backgroundColor: '#C8E6C9',
    borderColor: '#4CAF50',
  },
  dayCirclePending: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  dayCircleCurrent: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  dayTextCompleted: {
    color: '#4CAF50',
  },
  dayTextPending: {
    color: '#999',
  },
  dayTextCurrent: {
    color: '#fff',
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  streakText: {
    fontSize: width * 0.04,
    color: '#666',
    marginLeft: 5,
  },
});