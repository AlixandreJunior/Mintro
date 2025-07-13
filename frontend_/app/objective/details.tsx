import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import ObjectiveProgressCard from '@/components/ObjectiveProgressCard';
import ObjectiveStreakSection from '@/components/ObjectiveStreakSection';
import ObjectiveRateSection from '@/components/ObjectiveRateSection';
import ObjectiveConclusionSection from '@/components/ObjectiveConclusionSection';
import ObjectiveCalendarSection from '@/components/ObjectiveCalendarSection';

const { width, height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar='A' />
      <HeaderWithOptions title='Detalhes de Objetivo' />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ObjectiveProgressCard />
        <ObjectiveStreakSection />
        <ObjectiveCalendarSection />
        <ObjectiveRateSection />
        <ObjectiveConclusionSection />
        
        <View style={styles.startDateContainer}>
          <Text style={styles.startDateLabel}>Data de Início</Text>
          <Text style={styles.startDateValue}>08 de julho de 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
  startDateContainer: {
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  startDateLabel: {
    fontSize: width * 0.035,
    color: '#999',
    marginBottom: 5,
  },
  startDateValue: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: 'bold',
  },
});
