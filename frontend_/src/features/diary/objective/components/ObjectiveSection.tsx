import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { useObjective } from '../hooks/useObjective';
import ObjectiveDisplayCard from './ObjectiveCard';
import { use, useEffect, useState } from 'react';
import { Objective } from '@/share/types/mental/objectives';

const ObjectiveSection = () => {
  const { handleObjectiveList, loading, error } = useObjective();
  const [objectives, setObjectives] = useState<Objective[] | []>([]);

  useEffect(() => {
    const load = async () => {
      const list = await handleObjectiveList();
      setObjectives(list ?? []);
    };
    load();
  }, []);

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
          <Text style={styles.errorText}>
            Erro ao carregar objetivos: {error}
          </Text>
        </View>
      ) : (
        objectives.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos</Text>
            {objectives.map((objective) => (
              <ObjectiveDisplayCard
                key={objective.id}
                objectiveTitle={objective.activity.name}
                objectiveSubtitle={new Date(
                  objective.created_at
                ).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
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

export default ObjectiveSection;
