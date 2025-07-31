import { Dimensions, StyleSheet, Text, View } from "react-native";
import ObjectiveDisplayCard from "./Cards/ObjectiveCard";
import { getActivityIconName } from "@/utils/activityIconMapper";
import { ActivityIndicator } from "react-native-paper";
import { useObjective } from "@/hooks/useObjective";
import { router } from "expo-router";


export const ObjectiveSection = () => {
  const { objectives, loading, error } = useObjective(); // use o hook

  const formatDeadline = (deadlineString: string) => {
    const date = new Date(deadlineString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <>
      {loading ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          <Text style={styles.errorText}>Erro ao carregar objetivos: {error}</Text>
        </View>
      ) : (
        objectives.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            {objectives.map((objective) => (
              <ObjectiveDisplayCard
                key={objective.id}
                renderIcon={getActivityIconName(objective.activity.name)}
                objectiveTitle={objective.activity.name}
                objectiveSubtitle={`Meta até ${formatDeadline(objective.deadline)}`}
                //@ts-ignore
                onPress={() => router.push(`/objective/${objective.id}`)}
              />
            ))}
          </View>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginHorizontal: Dimensions.get('window').width * 0.05,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
