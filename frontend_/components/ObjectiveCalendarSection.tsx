import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateNavigator from "./DateNavigator";

const { width, height } = Dimensions.get('window');

const getMonthDays = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  const firstDayOfWeek = date.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek; i > 0; i--) {
    days.unshift({ day: prevMonthLastDay - i + 1, type: 'prev' });
  }

  const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthLastDay; i++) {
    const isChecked = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(i);
    const isCurrentDay = i === new Date().getDate() && month === new Date().getMonth();
    days.push({ day: i, type: 'current', isChecked, isCurrentDay });
  }

  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: i, type: 'next' });
  }
  return days;
};

const ObjectiveCalendarSection =({
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getMonthDays(currentYear, currentMonth);

    return(
        <SafeAreaView>
            <View style={styles.card}>
                <DateNavigator
                    currentDate={currentDate}
                    mode="month"
                    onDateChange={setCurrentDate}
                />
                <View style={styles.weekDaysContainer}>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                    <Text key={index} style={styles.weekDayText}>{day}</Text>
                    ))}
                </View>
                <View style={styles.daysGrid}>
                    {daysInMonth.map((dayObj, index) => (
                    <View
                        key={index}
                        style={[
                        styles.calendarDayCell,
                        dayObj.type === 'prev' && styles.calendarDayCellInactive,
                        dayObj.type === 'next' && styles.calendarDayCellInactive,
                        ]}
                    >
                        {dayObj.isChecked && dayObj.type === 'current' && (
                        <View style={styles.calendarCheckmarkOverlay}>
                            <MaterialCommunityIcons name="check" size={width * 0.05} color="#fff" />
                        </View>
                        )}
                        <Text style={[
                            styles.calendarDayText,
                            dayObj.type === 'current' && styles.calendarDayTextActive,
                            dayObj.isCurrentDay && styles.calendarCurrentDayText,
                        ]}>
                        {dayObj.day}
                        </Text>
                    </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.02,
        padding: width * 0.04,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    calendarMonth: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize',
    },
    weekDaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: height * 0.01,
    },
    weekDayText: {
        fontSize: width * 0.035,
        color: '#999',
        width: (width * 0.9 / 7) - 10,
        textAlign: 'center',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    calendarDayCell: {
        width: (width * 0.9 / 7) - (width * 0.01),
        height: (width * 0.9 / 7) - (width * 0.01),
        justifyContent: 'center',
        alignItems: 'center',
        margin: width * 0.005,
    },
    calendarDayCellInactive: {
        opacity: 0.4,
    },
    calendarDayText: {
        fontSize: width * 0.04,
        color: '#666',
    },
    calendarDayTextActive: {
        fontWeight: 'bold',
        color: '#333',
    },
    calendarCheckmarkOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#4CAF50',
        borderRadius: (width * 0.9 / 7) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarCurrentDayText: {
        color: '#fff',
        backgroundColor: '#4CAF50',
        borderRadius: (width * 0.9 / 7) / 2,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})

export default ObjectiveCalendarSection