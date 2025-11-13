import { ActivityIndicator } from 'react-native-paper';
import ObjectiveGridItem from './ObjectivesGridCard';
import { StyleSheet, View } from 'react-native';
import { getActivityIconName } from '@/share/utils/activityIconMapper';
import { useEffect, useState } from 'react';
import { Activity } from '@/share/types/mental/diary';

interface ActivityGridProps {
  activities: Activity[];
  multiple?: boolean;
  selected: number[] | number | null;
  setSelected: (value: number[] | number) => void;
}

export const ActivityGrid = ({
  activities,
  selected,
  setSelected,
  multiple = false,
}: ActivityGridProps) => {
  const isSelected = (id: number): boolean => {
    if (multiple && Array.isArray(selected)) {
      return selected.includes(id);
    }
    return selected === id;
  };

  const handleSelect = (id: number) => {
    if (multiple) {
      const selectedArray = Array.isArray(selected) ? selected : [];
      if (selectedArray.includes(id)) {
        setSelected(selectedArray.filter((item) => item !== id));
      } else {
        setSelected([...selectedArray, id]);
      }
    } else {
      setSelected(id);
    }
  };

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
            <View key={obj.id} style={styles.itemContainer}>
              <ObjectiveGridItem
                label={obj.name}
                renderIcon={getActivityIconName(obj.name)}
                isSelected={isSelected(Number(obj.id))}
                onPress={() => handleSelect(Number(obj.id))}
              />
            </View>
          ))}
        </View>
      );
    }

    return rows;
  };

  return <View style={styles.container}>{renderRows()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  objectiveRowWith5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  objectiveRowWith4: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
