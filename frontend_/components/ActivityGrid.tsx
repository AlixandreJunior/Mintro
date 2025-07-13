import { ActivityIndicator } from "react-native-paper";
import ObjectiveGridItem from "./ObjectivesGridCard";
import { StyleSheet, View } from "react-native";
import { getActivityIconName } from "@/utils/activityIconMapper";
import { useEffect, useState } from "react";
import { getActivities } from "@/services/diary/listActivities";
import { Activity } from "@/types/mental/diary";

interface ActivityGridProps {
  multiple?: boolean; 
  selected: number[] | number | null;
  setSelected: (value: number[] | number) => void;
}

export const ActivityGrid = ({ selected, setSelected, multiple = false }: ActivityGridProps) => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

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
        setSelected(selectedArray.filter(item => item !== id));
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
          style={i + itemsPerRow >= activities.length ? styles.objectiveRowWith4 : styles.objectiveRowWith5}
        >
          {row.map((obj) => (
            <ObjectiveGridItem
              key={obj.id}
              label={obj.name}
              renderIcon={getActivityIconName(obj.name)}
              isSelected={isSelected(Number(obj.id))}
              onPress={() => handleSelect(Number(obj.id))}
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
        <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        renderRows()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  objectiveRowWith5: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  objectiveRowWith4: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
