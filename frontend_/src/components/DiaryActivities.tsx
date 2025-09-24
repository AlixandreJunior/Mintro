// DiaryActivities.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getActivityIconName } from '@/utils/activityIconMapper';

interface TransformedActivity {
  name: string;
}

interface DiaryActivitiesProps {
  activities: TransformedActivity[];
}

export const DiaryActivities: React.FC<DiaryActivitiesProps> = ({
  activities,
}) => (
  <View style={styles.activitiesContainer}>
    {activities.map((a, i) => (
      <View key={i} style={styles.activityChip}>
        {getActivityIconName(a.name, 10)}
        <Text style={styles.activityText}>{a.name}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  activitiesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 2,
    marginRight: 6,
    maxWidth: '45%',
  },
  activityText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    marginLeft: 4,
    color: '#2B2B2B',
  },
});
