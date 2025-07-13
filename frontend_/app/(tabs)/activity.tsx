import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Header from "@/components/Layout/Header";
import DateNavigator from "@/components/DateNavigator";
import { useHealthData } from "@/hooks/useHealthData";
import { HealthStats } from "@/components/HealthStats";

const { width, height } = Dimensions.get("window");

export default function HealthScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { mindfulnessLogs, exerciseLogs, hydrationLogs, loading } = useHealthData(currentDate);

  return (
    <SafeAreaView style={styles.container}>
      <Header avatarChar="A" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator currentDate={currentDate} mode="day" onDateChange={setCurrentDate} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <HealthStats
            currentDate={currentDate}
            mindfulnessLogs={mindfulnessLogs}
            exerciseLogs={exerciseLogs}
            hydrationLogs={hydrationLogs}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, paddingHorizontal: width * 0.05 },
  loadingIndicator: { marginTop: height * 0.05 },
});
