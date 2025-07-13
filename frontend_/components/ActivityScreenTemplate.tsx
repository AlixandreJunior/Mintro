// src/templates/ActivityScreenTemplate.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { startOfWeek, isSameDay, isSameWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/components/Layout/Header";
import HeaderWithOptions from "@/components/Layout/HeaderWithOptions";
import DateNavigator from "@/components/DateNavigator";
import { SummarySection } from "@/components/SummarySection";
import { ActivityHistorySection } from "@/components/ActivityHistorySection";
import { WeekDaysContainer } from "@/components/WeekDaysContainer";
import { MindfulnessLog } from "@/types/health/mindfulness";
import { ExerciseLog } from "@/types/health/exercise";

interface WeekDayDisplay {
  id: string;
  letter: string;
  date: Date;
  exercised: boolean;
}

interface ActivityScreenTemplateProps {
  title: string;
  type: "exercise" | "mindfulness";
  onAddPress: () => void;
  fetchLogs: (date: Date) => Promise<MindfulnessLog[]| ExerciseLog[]>;
}

function ActivityScreenTemplate({
  title,
  type,
  fetchLogs,
  onAddPress,
}: ActivityScreenTemplateProps) {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [logs, setLogs] = useState<MindfulnessLog[]| ExerciseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekDaysDisplay, setWeekDaysDisplay] = useState<WeekDayDisplay[]>([]);
  const [fetchedWeekStartDate, setFetchedWeekStartDate] = useState<Date | null>(
    null
  );

  useEffect(() => {
    const loadLogs = async () => {
      const startOfCurrentWeek = startOfWeek(currentDisplayDate, {
        weekStartsOn: 0,
        locale: ptBR,
      });

      if (
        fetchedWeekStartDate &&
        isSameWeek(startOfCurrentWeek, fetchedWeekStartDate, {
          weekStartsOn: 0,
          locale: ptBR,
        })
      ) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchLogs(currentDisplayDate);

        const currentWeekDays: Date[] = [...Array(7)].map((_, i) => {
          const day = new Date(startOfCurrentWeek);
          day.setDate(startOfCurrentWeek.getDate() + i);
          return day;
        });

        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

        const weekDaysData: WeekDayDisplay[] = currentWeekDays.map(
          (day, index) => ({
            id: daysOfWeek[index],
            letter: daysOfWeek[index],
            date: day,
            exercised: data.some((log) =>
              isSameDay(new Date(log.datetime), day)
            ),
          })
        );

        setLogs(data);
        setWeekDaysDisplay(weekDaysData);
        setFetchedWeekStartDate(startOfCurrentWeek);
      } catch (err: any) {
        setError(err.message || `Erro ao carregar registros de ${type}.`);
        console.error(`Error loading ${type} logs:`, err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [currentDisplayDate, fetchedWeekStartDate, fetchLogs, type]);

  const completedDays = weekDaysDisplay.filter((d) => d.exercised).length;
  const totalLogs = logs.length;

  const handleBack = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />
      <HeaderWithOptions title={title} onBackPress={handleBack} onOptionPress={() => {}} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <DateNavigator
          mode="week"
          currentDate={currentDisplayDate}
          onDateChange={setCurrentDisplayDate}
        />

        <SummarySection
          activityType={type}
          completedDays={completedDays}
          totalExercises={totalLogs}
        />

        <WeekDaysContainer weekDaysDisplay={weekDaysDisplay} />

        <ActivityHistorySection
          type={type}
          loading={loading}
          logs={logs}
          error={error}
        />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={onAddPress}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ActivityScreenTemplate;
