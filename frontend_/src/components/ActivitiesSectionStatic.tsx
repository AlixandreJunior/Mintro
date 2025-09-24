import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Activity } from '@/src/types/mental/diary';
import { getActivities } from '@/src/services/diary/listActivities';
import { ActivityGridStatic } from './ActivityGridStatic';

export const ActivitiesSectionStatic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (err: any) {
        console.error('Erro ao carregar atividades:', err);
        setError('Erro ao carregar atividades');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Atividades</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : activities.length === 0 ? (
        <Text>Nenhuma atividade encontrada.</Text>
      ) : (
        <View style={styles.activityGrid}>
          <ActivityGridStatic />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 12,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 4,
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  activityItem: {
    margin: 5,
  },
});
