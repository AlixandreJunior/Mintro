import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import DateNavigator from '@/components/DateNavigator';
import DayStreakSection from '@/components/DayStreakSection';
import MoodLineChart from '@/components/MoodLineChart';
import MoodPieChart from '@/components/MoodPieChart';
import MoodLegend from '@/components/MoodLegend';
import FrequentMoodSelector from '@/components/FrequentMoodSelector';
import { ActivitiesSection } from '@/components/ActivitySection';
import { ActivitiesSectionStatic } from '@/components/ActivitiesSectionStatic';

const { width, height } = Dimensions.get('window');

const MOCK_DAY_STREAK_DATA = [
  { day: 'Seg', isCompleted: true },
  { day: 'Ter', isCompleted: true },
  { day: 'Qua', isCompleted: true },
  { day: 'Qui', isCompleted: true },
  { day: 'Hoje', isCompleted: false, value: 1 },
];

const MOCK_ACTIVITIES_DATA = [
  { id: '1', iconName: 'basketball', label: 'Esportes', count: 2 },
  { id: '2', iconName: 'account-group', label: 'amigos', count: 6 },
  { id: '3', iconName: 'human-female-dance', label: 'Atividade física', count: 4 },
  { id: '4', iconName: 'sleep', label: 'Bom sono', count: 2 },
  { id: '5', iconName: 'book-open-page-variant', label: 'Ler', count: 2 },
  { id: '6', iconName: 'weather-sunset-down', label: 'Dormir cedo', count: 3 },
  { id: '7', iconName: 'food-apple', label: 'Alimentação saudável', count: 2 },
  { id: '8', iconName: 'laptop', label: 'Atividade inusual', count: 2 },
  { id: '9', iconName: 'gamepad-variant', label: 'Jogos', count: 2 },
  { id: '10', iconName: 'shopping', label: 'Compras', count: 1 },
  { id: '11', iconName: 'filmstrip', label: 'Filmes', count: 1 },
  { id: '12', iconName: 'walk', label: 'Descanso', count: 1 },
  { id: '13', iconName: 'briefcase', label: 'Trabalho', count: 1 },
];

type Mood = 'Excelente' | 'Bem' | 'Neutro' | 'Mal' | 'Horrível';

export default function App(): React.JSX.Element {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedFrequentMood, setSelectedFrequentMood] = useState<Mood>('Excelente');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#C8E6C9" />

      <Header avatarChar="A" />
      <HeaderWithOptions title="Estatisticas" />
      <DateNavigator currentDate={currentMonth} mode="month" onDateChange={setCurrentMonth} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DayStreakSection data={MOCK_DAY_STREAK_DATA} />

        <Text style={styles.sectionTitle}>Gráfico de Humor</Text>
        <Text style={styles.sectionSubtitle}>Veja aqui a sua mensagem de humor do mês</Text>
        <MoodLineChart />

        <Text style={styles.sectionTitle}>Contagem de Humor</Text>
        <Text style={styles.sectionSubtitle}>Veja aqui a sua contagem de humor do mês</Text>
        <MoodPieChart />
        <MoodLegend />

        <Text style={styles.sectionTitle}>Frequentemente junto</Text>
        <Text style={styles.sectionSubtitle}>Veja aqui as atividades vinculadas com cada emoção</Text>
        <FrequentMoodSelector
          selectedMood={selectedFrequentMood}
          onSelect={setSelectedFrequentMood}
        />
        <ActivitiesSectionStatic />

        <Text style={styles.sectionTitle}>Contagem de Atividades</Text>
        <Text style={styles.sectionSubtitle}>Veja aqui a sua contagem de atividades do mês</Text>
        <ActivitiesSectionStatic />
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
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.01,
  },
  sectionSubtitle: {
    fontSize: width * 0.035,
    color: '#666',
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
  },
});
