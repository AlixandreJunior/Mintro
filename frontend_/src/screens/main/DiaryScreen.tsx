import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/layout/Header';
import FloatingActionButton from '@/components/DiaryFloatingButton';
import DateNavigator from '@/components/DateNavigator';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { DiaryHistoricSection } from '@/components/DiaryHistoricSection';

const DiaryScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCreateDiary = () => router.push('/diary/create');
  const handleCreateObjective = () => router.push('/objective/create');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          mode="month"
          onDateChange={setCurrentDate}
        />
        <ObjectiveSection />
        <DiaryHistoricSection initialDate={currentDate} />
      </ScrollView>

      <FloatingActionButton
        onPressCreateDiary={handleCreateDiary}
        onPressCreateObjective={handleCreateObjective}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1 },
});

export default DiaryScreen;
