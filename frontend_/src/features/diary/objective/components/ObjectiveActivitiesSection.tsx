import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityGrid } from '@/share/components/ActivityGrid';

interface Activity {
  id: string;
  name: string;
}

interface ActivitiesSectionProps {
  title: string;
  selected: string[] | string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

const STATIC_ACTIVITIES: Activity[] = [
  { id: '1', name: 'Família' },
  { id: '2', name: 'Amigos' },
  { id: '3', name: 'Encontro' },
  { id: '4', name: 'Atividade Física' },
  { id: '5', name: 'Esporte' },
  { id: '6', name: 'Dormir Cedo' },
  { id: '7', name: 'Alimentação Saudável' },
  { id: '8', name: 'Descanso' },
  { id: '9', name: 'Filmes' },
  { id: '10', name: 'Ler' },
  { id: '11', name: 'Jogos' },
  { id: '12', name: 'Compras' },
  { id: '13', name: 'Trabalho' },
];

export const ActivitiesSection = ({
  title,
  selected,
  setSelected,
}: ActivitiesSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {STATIC_ACTIVITIES.length === 0 ? (
        <Text>Nenhuma atividade encontrada.</Text>
      ) : (
        <View style={styles.activityGrid}>
          <ActivityGrid
            activities={STATIC_ACTIVITIES}
            //@ts-ignore
            selected={selected}
            //@ts-ignore
            setSelected={setSelected}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 15,
    textAlign: 'left',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
