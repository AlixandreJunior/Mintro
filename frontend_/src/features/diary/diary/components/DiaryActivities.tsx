import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { getActivityIconName } from '@/share/utils/activityIconMapper';

interface TransformedActivity {
  name: string;
}

interface DiaryActivitiesProps {
  activities: TransformedActivity[];
}

export const DiaryActivities: React.FC<DiaryActivitiesProps> = ({
  activities,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.activitiesContainer}>
      {activities.map((a, i) => (
        <View
          key={i}
          style={[styles.activityChip, { maxWidth: screenWidth / 2.5 }]}
        >
          {getActivityIconName(a.name, 12)}
          <Text style={styles.activityText}>{a.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
    marginRight: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  activityText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    marginLeft: 6,
    color: '#2B2B2B',
  },
});
