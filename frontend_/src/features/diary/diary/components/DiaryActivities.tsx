import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { getActivityIconName } from '@/share/utils/activityIconMapper';

interface TransformedActivity {
  name: string;
}

interface DiaryActivitiesProps {
  activities: TransformedActivity[];
  chipBackgroundColor?: string;
  textColor?: string;
}

export const DiaryActivities: React.FC<DiaryActivitiesProps> = ({
  activities,
  chipBackgroundColor = 'rgba(0,0,0,0.05)',
  textColor = '#2B2B2B',
}) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {activities.map((activity, index) => (
        <View
          key={index}
          style={[
            styles.chip,
            {
              backgroundColor: chipBackgroundColor,
              maxWidth: screenWidth / 3, // menor largura
            },
          ]}
        >
          {getActivityIconName(activity.name, 10)} {/* ícone menor */}
          <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>
            {activity.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 16,
    flexShrink: 1,
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    marginLeft: 4,
  },
});
