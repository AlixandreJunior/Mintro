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
import ObjectiveDisplayCard from '@/components/Cards/ObjectiveCard';
import NotebookIcon from '@/components/Icons/NotebookIcon';

const { width, height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Detalhes de Objetivo"
        options={[
          { label: 'Repetir', onPress: () => console.log('Editar') },
          { label: 'Lembretes', onPress: () => console.log('Editar') },
          { label: 'Excluir', onPress: () => console.log('Excluir') },
        ]}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ObjectiveDisplayCard
          objectiveTitle="Pug"
          objectiveSubtitle="RANNN"
          renderIcon={<NotebookIcon />}
        />
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
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
  startDateContainer: {
    alignItems: 'center',
    width: 140,
    alignSelf: 'center',
  },
  startDateLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 2,
  },
  startDateValue: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#000000',
    textAlign: 'center',
  },
});
