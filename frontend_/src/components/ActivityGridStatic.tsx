import { ActivityIndicator } from 'react-native-paper';
import ObjectiveGridItem from './ObjectivesGridCard';
import { StyleSheet, View } from 'react-native';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { useEffect, useState } from 'react';
import { getActivities } from '@/src/services/diary/listActivities';
import { Activity } from '@/types/mental/diary';

export const ActivityGridStatic = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const renderRows = () => {
    const rows = [];
    const itemsPerRow = 5;

    for (let i = 0; i < activities.length; i += itemsPerRow) {
      const row = activities.slice(i, i + itemsPerRow);
      rows.push(
        <View
          key={`row-${i}`}
          style={
            i + itemsPerRow >= activities.length
              ? styles.objectiveRowWith4
              : styles.objectiveRowWith5
          }
        >
          {row.map((obj) => (
            <ObjectiveGridItem
              key={obj.id}
              label={obj.name}
              renderIcon={getActivityIconName(obj.name)}
              isSelected={false}
              onPress={() => console.log()}
            />
          ))}
        </View>
      );
    }

    return rows;
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#4CAF50"
          style={{ marginTop: 20 }}
        />
      ) : (
        renderRows()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  objectiveRowWith5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  objectiveRowWith4: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
