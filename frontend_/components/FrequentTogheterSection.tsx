import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FrequentMoodSelector from './FrequentMoodSelector';
import { ActivitiesSectionStatic } from './ActivitiesSectionStatic';
import { MoodType } from '@/types/mental/diary';

const { width, height } = Dimensions.get('window');

interface FrequentTogetherSectionProps {
  selectedMood: MoodType;
  onSelect: (mood: MoodType) => void;
}

export default function FrequentTogetherSection({
  selectedMood,
  onSelect,
}: FrequentTogetherSectionProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Frequentemente junto</Text>
      <Text style={styles.sectionSubtitle}>
        Veja aqui as atividades vinculadas com cada emoção
      </Text>
      <FrequentMoodSelector selectedMood={selectedMood} onSelect={onSelect} moodCount={1} />
      <ActivitiesSectionStatic />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2C3E50',
    marginBottom: height * 0.005,
  },
  sectionSubtitle: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_400Regular',
    color: '#7B7B7B',
    marginBottom: height * 0.02,
  },
});
