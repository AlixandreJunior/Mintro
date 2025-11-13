import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Header from '@/share/components/layout/Header';
import DateNavigator from '@/share/components/DateNavigator';
import { HealthStats } from '@/share/components/HealthStats';

const { width } = Dimensions.get('window');

const HealthScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DateNavigator
          currentDate={currentDate}
          mode="day"
          onDateChange={setCurrentDate}
        />
        <HealthStats currentDate={currentDate} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: width * 0.05 },
});

export default HealthScreen;
