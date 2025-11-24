import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  format,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfWeek,
  endOfWeek,
  isToday,
  isTomorrow,
  isYesterday,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { width, height } = Dimensions.get('window');

interface DateNavigatorProps {
  currentDate: Date;
  mode: 'day' | 'week' | 'month' | 'year';
  onDateChange: (newDate: Date) => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  mode,
  onDateChange,
}) => {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // --- Desabilita botão "próximo" se a próxima data ultrapassa HOJE ---
  const isNextDisabled = (() => {
    switch (mode) {
      case 'day': {
        const next = addDays(currentDate, 1);
        return next.getTime() > todayStart.getTime();
      }

      case 'week': {
        const next = addWeeks(currentDate, 1);
        const nextStart = startOfWeek(next, { weekStartsOn: 0 });
        return nextStart.getTime() > todayStart.getTime();
      }

      case 'month': {
        const next = addMonths(currentDate, 1);
        const monthStart = new Date(next.getFullYear(), next.getMonth(), 1);
        return monthStart.getTime() > todayStart.getTime();
      }

      case 'year': {
        const next = addYears(currentDate, 1);
        const yearStart = new Date(next.getFullYear(), 0, 1);
        return yearStart.getTime() > todayStart.getTime();
      }
    }
  })();

  const handlePrev = () => {
    let newDate: Date;

    switch (mode) {
      case 'day':
        newDate = subDays(currentDate, 1);
        break;
      case 'week':
        newDate = subWeeks(currentDate, 1);
        break;
      case 'month':
        newDate = subMonths(currentDate, 1);
        break;
      case 'year':
        newDate = subYears(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }

    onDateChange(newDate);
  };

  const handleNext = () => {
    if (isNextDisabled) return;

    let newDate: Date = currentDate;

    switch (mode) {
      case 'day':
        newDate = addDays(currentDate, 1);
        break;

      case 'week':
        newDate = addWeeks(currentDate, 1);
        break;

      case 'month':
        newDate = addMonths(currentDate, 1);
        break;

      case 'year':
        newDate = addYears(currentDate, 1);
        break;
    }

    onDateChange(newDate);
  };

  const getSpecialLabel = (
    date: Date,
    mode: 'day' | 'week' | 'month' | 'year'
  ) => {
    const today = new Date();

    switch (mode) {
      case 'day':
        if (isToday(date)) return 'Hoje';
        if (isYesterday(date)) return 'Ontem';
        if (isTomorrow(date)) return 'Amanhã';
        break;

      case 'week':
        if (isSameWeek(date, today, { weekStartsOn: 0 })) return 'Esta semana';
        if (isSameWeek(date, subWeeks(today, 1), { weekStartsOn: 0 }))
          return 'Semana passada';
        if (isSameWeek(date, addWeeks(today, 1), { weekStartsOn: 0 }))
          return 'Próxima semana';
        break;

      case 'month':
        if (isSameMonth(date, today)) return 'Este mês';
        if (isSameMonth(date, subMonths(today, 1))) return 'Mês passado';
        if (isSameMonth(date, addMonths(today, 1))) return 'Próximo mês';
        break;

      case 'year':
        if (isSameYear(date, today)) return 'Este ano';
        if (isSameYear(date, subYears(today, 1))) return 'Ano passado';
        if (isSameYear(date, addYears(today, 1))) return 'Próximo ano';
        break;
    }

    return null;
  };

  const getFormattedLabel = () => {
    const specialLabel = getSpecialLabel(currentDate, mode);
    if (specialLabel) return specialLabel;

    switch (mode) {
      case 'day':
        return format(currentDate, "EEEE, d 'de' MMMM", {
          locale: ptBR,
        }).replace(/^\w/, (c) => c.toUpperCase());

      case 'week': {
        const start = startOfWeek(currentDate, {
          locale: ptBR,
          weekStartsOn: 0,
        });
        const end = endOfWeek(currentDate, {
          locale: ptBR,
          weekStartsOn: 0,
        });
        return `${format(start, 'd/MM')} - ${format(end, 'd/MM')}`;
      }

      case 'month':
        return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });

      case 'year':
        return format(currentDate, 'yyyy', { locale: ptBR });
    }
  };

  return (
    <View style={styles.dateNavigator}>
      <TouchableOpacity onPress={handlePrev}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#374151" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.dateText}>{getFormattedLabel()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext} disabled={isNextDisabled}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={isNextDisabled ? 'rgba(55, 65, 81, 0.3)' : '#374151'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  dateText: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
  },
});

export default DateNavigator;
