// components/ActivityCalendar.tsx
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DateNavigator from './DateNavigator';
import CheckmarkIcon from './Icons/CheckMarkIcon';

const { width, height } = Dimensions.get('window');

interface CalendarDay {
  day: number;
  type: 'prev' | 'current' | 'next';
  isChecked: boolean; // antigo, talvez usar para outros fins
  isCurrentDay: boolean;
  isMarked: boolean; // novo: indica se dia está marcado (exercício feito)
}

interface ActivityCalendarProps {
  markedDates?: Date[];
  currentDate: Date; // dias marcados para exercicios
}

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getMonthDays = (
  year: number,
  month: number,
  markedDates: Date[] = []
): CalendarDay[] => {
  const days: CalendarDay[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeekIndex = firstDayOfMonth.getDay();

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeekIndex; i > 0; i--) {
    days.unshift({
      day: prevMonthLastDay - i + 1,
      type: 'prev',
      isChecked: false,
      isCurrentDay: false,
      isMarked: false,
    });
  }

  const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 1; i <= currentMonthLastDay; i++) {
    const currentDate = new Date(year, month, i);
    const isCurrentDay =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    // verifica se essa data está na lista de marcados
    const isMarked = markedDates.some((d) => isSameDate(d, currentDate));

    days.push({
      day: i,
      type: 'current',
      isChecked: false, // pode usar isChecked para outra coisa se quiser
      isCurrentDay,
      isMarked,
    });
  }

  const remainingCellsInLastWeek = 7 - (days.length % 7);
  if (remainingCellsInLastWeek < 7) {
    for (let i = 1; i <= remainingCellsInLastWeek; i++) {
      days.push({
        day: i,
        type: 'next',
        isChecked: false,
        isCurrentDay: false,
        isMarked: false,
      });
    }
  }

  return days;
};

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  markedDates = [],
  currentDate,
}) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getMonthDays(currentYear, currentMonth, markedDates);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <View style={styles.weekDaysContainer}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
            (day, index) => (
              <Text key={index} style={styles.weekDayText}>
                {day}
              </Text>
            )
          )}
        </View>

        <View style={styles.daysGrid}>
          {daysInMonth.map((dayObj, index) => (
            <View
              key={index}
              style={[
                styles.calendarDayCell,
                dayObj.type !== 'current' && styles.calendarDayCellInactive,
              ]}
            >
              <View
                style={[
                  styles.dayCircle,
                  dayObj.isMarked && styles.dayCircleMarked, // marcação aqui
                  dayObj.isCurrentDay && styles.dayCircleToday, // destaque para hoje
                ]}
              >
                {dayObj.isMarked ? (
                  <CheckmarkIcon size={width * 0.035} color="#fff" />
                ) : (
                  <Text
                    style={[
                      styles.dayNumber,
                      dayObj.type !== 'current' && styles.dayNumberInactive,
                    ]}
                  >
                    {dayObj.day}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.dayNumberBelowCircle,
                  dayObj.isCurrentDay && styles.dayNumberTodayBellowCircle,
                  dayObj.type !== 'current' && styles.dayNumberInactive,
                ]}
              >
                {dayObj.day}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: width * 0.05,
    padding: width * 0.04,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },

  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.01,
  },
  weekDayText: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_300Light',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  calendarDayCell: {
    width: (width * 0.9 - 2 * width * 0.04) / 7,
    height: ((width * 0.9 - 2 * width * 0.04) / 7) * 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.005,
    paddingBottom: height * 0.005,
  },
  calendarDayCellInactive: {
    opacity: 0.5,
  },
  dayCircle: {
    width: width * 0.065,
    height: width * 0.065,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D3',
    marginBottom: height * 0.005,
  },
  dayCircleMarked: {
    backgroundColor: '#4CAF50', // verde para dias marcados
    borderColor: '#4CAF50',
  },
  dayCircleToday: {
    borderColor: '#2196F3', // azul para dia atual
    borderWidth: 2,
  },

  dayNumber: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_300Light',
    color: '#010101',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dayNumberBelowCircle: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_300Light',
    color: '#010101',
    textAlign: 'center',
  },
  dayNumberInactive: {
    color: 'rgba(1, 1, 1, 0.5)',
  },
  dayNumberTodayBellowCircle: {},
});

export default ActivityCalendar;
