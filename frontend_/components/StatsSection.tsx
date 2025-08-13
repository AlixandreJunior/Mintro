import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StatCard from "./StatCard";
import ExerciseIcon from "./Icons/ExerciseIcon";
import MeditationIcon from "./Icons/MeditationIcon";
import NotebookIcon from "./Icons/NotebookIcon";
import { User } from "@/types/user/user";
import { router } from "expo-router";

interface StatsSectionProps {
  fetchedUser: User | null;
  loadingUser: boolean;
  errorUser: string | null;
}

const { width, height } = Dimensions.get('window');

const cardGap = 10;
const screenContentPaddingHorizontal = 20;
const threeColumnCardWidth = (width - (screenContentPaddingHorizontal * 2) - (cardGap * (3 - 1))) / 3;

export const StatsSection: React.FC<StatsSectionProps> = ({
  fetchedUser,
  loadingUser,
  errorUser,

}) => {
  const statistics = fetchedUser ? [
    { icon: <NotebookIcon size={14} />, value: fetchedUser.diarys_registers, label: 'Diários registrados' },
    { icon: <MeditationIcon size={18} />, value: fetchedUser.mindfulness_registers, label: 'Sessões de Mindfulness' },
    { icon: <ExerciseIcon size={25} />, value: fetchedUser.exercises_registers, label: 'Exercícios físicos' },
  ] : [];

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <TouchableOpacity style={styles.seeMoreButton} onPress={() => router.push('/stats')}>
            <Text style={styles.textLink}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
      {loadingUser ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : errorUser ? (
        <Text style={styles.errorText}>Erro ao carregar estatísticas: {errorUser}</Text>
      ) : statistics.length === 0 ? (
        <Text style={styles.noDataText}>Nenhuma estatística disponível.</Text>
      ) : (
        <View style={styles.metricCardGrid}>
          {statistics.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              cardWidth={threeColumnCardWidth}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
    marginBottom: height * 0.005
  },
  metricCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: cardGap,
  },
  loadingIndicator: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: width * 0.02,
    marginTop: height * 0.02,
    fontFamily: 'Poppins_400Regular',
  },
  noDataText: {
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: width * 0.02,
    marginTop: height * 0.02,
    fontFamily: 'Poppins_400Regular',
  },
  seeMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLink: {
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.038,
    lineHeight: 21,
    textAlign: 'center',
    color: '#1FB6FF',
  },
});
