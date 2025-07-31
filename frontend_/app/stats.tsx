import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import DayStreakSection from '@/components/DayStreakSection';
import MoodChartSection from '@/components/MoodChartSection';
import MoodCountSection from '@/components/MoodCountSection';
import MoodLegend from '@/components/MoodLegend';
import FrequentTogetherSection from '@/components/FrequentTogheterSection';
import ActivitiesCountSection from '@/components/ActivitiesCountSection';
import { MoodType } from '@/types/mental/diary';

const { width, height } = Dimensions.get('window');

const MOCK_DAY_STREAK_DATA = [
  { day: 'Seg', isCompleted: true },
  { day: 'Ter', isCompleted: true },
  { day: 'Qua', isCompleted: true },
  { day: 'Qui', isCompleted: true },
  { day: 'Hoje', isCompleted: false, value: 1 },
];

export default function App(): React.JSX.Element {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedFrequentMood, setSelectedFrequentMood] = useState<MoodType>('Excelente');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Estatisticas" />
      <DateNavigator currentDate={currentMonth} mode="month" onDateChange={setCurrentMonth} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DayStreakSection data={MOCK_DAY_STREAK_DATA} />
        <MoodChartSection />
        <MoodCountSection />
        <MoodLegend />
        <FrequentTogetherSection
          selectedMood={selectedFrequentMood}
          onSelect={setSelectedFrequentMood}
        />
        <ActivitiesCountSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
});