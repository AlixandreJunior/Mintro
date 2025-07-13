import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ActivityGrid } from "@/components/ActivityGrid";
import { getActivities } from "@/services/diary/listActivities";
import { Activity } from "@/types/mental/diary";

interface ActivitiesSectionProps {
    title: string
    selected: number[] | number | null;
    setSelected: (value: number[] | number) => void;
    multiple?: boolean;
}

export const ActivitiesSection = ({
    title,
    selected,
    setSelected,
    multiple = false,
}: ActivitiesSectionProps) => {
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState<any>()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        const fetchActivitiesData = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await getActivities();
            setActivities(data);
          } catch (err: any) {
            setError(err.message || 'Falha ao carregar atividades.');
            console.error('Erro ao buscar atividades:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchActivitiesData();
      }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar atividades: {error}</Text>
      ) : activities.length === 0 ? (
        <Text>Nenhuma atividade encontrada.</Text>
      ) : (
        <View style={styles.activityGrid}>
          <ActivityGrid selected={selected} setSelected={setSelected} multiple={multiple} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 12,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#4B5563",
    marginBottom: 15,
    textAlign: "left",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  activityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
