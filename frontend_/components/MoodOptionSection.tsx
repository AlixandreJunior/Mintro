import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMoodVisuals } from '../utils/moodHelper';

interface MoodOption {
  id: string;
  label: string;
  imageSource: any;
  isSelected: boolean;
}

interface MoodOptionProps {
  handleMoodSelect: (moodId: string) => void;
}

const MoodOptionSection: React.FC<MoodOptionProps> = ({ handleMoodSelect }) => {
  const [moods, setMoods] = useState([
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
      >
        <View style={styles.moodIconContainer}>
          <mood.imageSource />
        </View>
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
    <SafeAreaView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como você está se sentindo?</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <MoodIcon key={mood.id} mood={mood} />
          ))}
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 15,
    textAlign: 'left',
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodOption: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  moodOptionSelected: {
    backgroundColor: '#E0F2F1',
    borderColor: '#4CAF50',
  },
  moodIconContainer: {
    marginBottom: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodImage: {
    width: 50,
    height: 50,
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
