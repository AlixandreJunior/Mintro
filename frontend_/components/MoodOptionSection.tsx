import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { getMoodVisuals } from '../utils/moodHelper';

const ITEMS_PER_ROW = 5;
const GAP = 8;

interface MoodOption {
  id: string;
  label: string;
  imageSource: () => React.ReactNode;
  isSelected: boolean;
}

interface MoodOptionProps {
  handleMoodSelect: (moodId: string) => void;
}

const MoodOptionSection: React.FC<MoodOptionProps> = ({ handleMoodSelect }) => {
  const [moods, setMoods] = useState<MoodOption[]>([
    {
      id: 'Excelente',
      label: 'Excelente',
      imageSource: () => getMoodVisuals('Excelente').iconSource,
      isSelected: false,
    },
    {
      id: 'Bom',
      label: 'Bom',
      imageSource: () => getMoodVisuals('Bom').iconSource,
      isSelected: false,
    },
    {
      id: 'Neutro',
      label: 'Neutro',
      imageSource: () => getMoodVisuals('Neutro').iconSource,
      isSelected: false,
    },
    {
      id: 'Ruim',
      label: 'Ruim',
      imageSource: () => getMoodVisuals('Ruim').iconSource,
      isSelected: false,
    },
    {
      id: 'Péssimo',
      label: 'Péssimo',
      imageSource: () => getMoodVisuals('Péssimo').iconSource,
      isSelected: false,
    },
  ]);

  const onSelectMood = (id: string) => {
    setMoods((prev) =>
      prev.map((m) => ({
        ...m,
        isSelected: m.id === id,
      }))
    );
    handleMoodSelect(id);
  };

  const MoodIcon: React.FC<{ mood: MoodOption }> = ({ mood }) => {
    return (
      <TouchableOpacity
        style={[
          styles.moodOption,
          mood.isSelected && styles.moodOptionSelected,
        ]}
        onPress={() => onSelectMood(mood.id)}
        activeOpacity={0.7}
      >
        <View style={styles.moodIconContainer}>{mood.imageSource()}</View>
        <Text
          style={[
            styles.moodLabel,
            mood.isSelected && styles.moodLabelSelected,
          ]}
        >
          {mood.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como você está se sentindo?</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood, index) => (
            <View
              key={mood.id}
              style={[
                styles.itemWrapper,
                (index + 1) % ITEMS_PER_ROW === 0 && { marginRight: 0 },
              ]}
            >
              <MoodIcon mood={mood} />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 8 },
  section: {},
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 15,
    textAlign: 'left',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    flexGrow: 1,
    flexBasis: '18%',
    maxWidth: '20%',
    marginRight: GAP,
    marginBottom: GAP,
  },
  moodOption: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  moodOptionSelected: {
    borderColor: '#79D457',
  },
  moodIconContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  moodLabelSelected: {
    color: '#79D457',
    fontWeight: '600',
  },
});

export default MoodOptionSection;
