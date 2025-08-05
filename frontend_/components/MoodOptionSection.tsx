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

const { width } = Dimensions.get('window');

const HORIZONTAL_PADDING = 8 * 2;
const ITEMS_PER_ROW = 5;
const GAP = 1;
const TOTAL_GAP = GAP * (ITEMS_PER_ROW - 1);
const ITEM_WIDTH = (width - HORIZONTAL_PADDING - TOTAL_GAP) / ITEMS_PER_ROW;

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

  const MoodIcon: React.FC<{ mood: MoodOption }> = ({ mood }) => {
    return (
      <TouchableOpacity
        style={[
          styles.moodOption,
          mood.isSelected && styles.moodOptionSelected,
        ]}
        onPress={() => handleMoodSelect(mood.id)}
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
                (index + 1) % ITEMS_PER_ROW === 0 ? { marginRight: 0 } : {},
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
  container: { flex: 1 },
  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 15,
    textAlign: 'left',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  itemWrapper: {
    width: ITEM_WIDTH,
    marginRight: GAP,
    marginBottom: GAP,
  },
  moodOption: {
    flexGrow: 0,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,

    // sombra leve para padrão não selecionado
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
    backgroundColor: '#E0F2F1',
    borderColor: '#A5D6A7', // verde claro
    // sombra mais forte para selecionado
    ...Platform.select({
      ios: {
        shadowColor: '#A5D6A7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
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
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default MoodOptionSection;
