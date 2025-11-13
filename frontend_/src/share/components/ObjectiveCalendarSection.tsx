// components/ObjectiveCalendarSection.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DateNavigator from './DateNavigator';
import CheckmarkIcon from './icons/CheckMarkIcon';
import MainCard from './MainCard';

const { width, height } = Dimensions.get('window');

interface CalendarDay {
  day: number;
  type: 'prev' | 'current' | 'next';
  isChecked: boolean;
  isCurrentDay: boolean;
}

const cellSize = width * 0.115;

const getMonthDays = (
  year: number,
  month: number,
  diary_dates: string[]
): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeekIndex = firstDayOfMonth.getDay();

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeekIndex; i > 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i + 1);
    days.unshift({
      day: date.getDate(),
      type: 'prev',
      isChecked: diary_dates.includes(date.toISOString().slice(0, 10)),
      isCurrentDay: false,
    });
  }

  const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  for (let i = 1; i <= currentMonthLastDay; i++) {
    const date = new Date(year, month, i);
    const isChecked = diary_dates.includes(date.toISOString().slice(0, 10));
    const isCurrentDay =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    days.push({ day: i, type: 'current', isChecked, isCurrentDay });
  }

  const remainingCellsInLastWeek = 7 - (days.length % 7);
  if (remainingCellsInLastWeek < 7) {
    for (let i = 1; i <= remainingCellsInLastWeek; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        day: i,
        type: 'next',
        isChecked: diary_dates.includes(date.toISOString().slice(0, 10)),
        isCurrentDay: false,
      });
    }
  }

  return days;
};

interface ObjectiveCalendarSectionProps {
  diary_dates: string[];
}

const ObjectiveCalendarSection: React.FC<ObjectiveCalendarSectionProps> = ({
  diary_dates,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getMonthDays(currentYear, currentMonth, diary_dates);

  return (
    <MainCard>
      <DateNavigator
        currentDate={currentDate}
        mode="month"
        onDateChange={setCurrentDate}
      />

      <View style={styles.weekDaysContainer}>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
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
                dayObj.isChecked && styles.dayCircleChecked,
              ]}
            >
              <CheckmarkIcon size={width * 0.035} color="#fff" />
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
    </MainCard>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  weekDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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
    width: cellSize * 7, // largura exata para 7 células
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  calendarDayCell: {
    width: cellSize,
    height: cellSize * 1.5,
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
  dayCircleChecked: {
    backgroundColor: '#41ff41ff',
    borderColor: '#C8C8C8',
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

export default ObjectiveCalendarSection;
