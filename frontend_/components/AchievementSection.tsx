import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AchievementIconBase from "./Icons/AchievementIcon";

const { width, height } = Dimensions.get('window');

interface Achievement {
  id: string;
  iconName: string;
  label: string;
  starsAchieved: number;
  totalStars: number;
  isUnlocked: boolean;
  primaryColor?: string; // Cor principal para itens desbloqueados/ativos
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', iconName: 'leaf', label: 'Bem-vindo ao Mintro', starsAchieved: 3, totalStars: 3, isUnlocked: true, primaryColor: '#79D457' }, // Verde mais claro
  { id: '4', iconName: 'dumbbell', label: 'Foco Total', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '5', iconName: 'water', label: 'Gota a Gole', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '7', iconName: 'meditation', label: 'Zen Total', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '8', iconName: 'book-open-page-variant', label: 'Narrador da própria história', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
];

interface AchievementSectionProps {}
const itemWidth = (width - (2 * width * 0.04) - (2 * width * 0.02)) / 3;
  const iconBaseSize = itemWidth * 0.7;
  const iconMCI_Size = iconBaseSize * 0.5;
  const starSize = itemWidth * 0.08;

const AchievementSection: React.FC<AchievementSectionProps> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          {MOCK_ACHIEVEMENTS.map((achievement) => {
            const mciIconColor = achievement.isUnlocked ? '#00FF4C' : '#A0A0A0';

            return (
              <View
                key={achievement.id}
                style={[
                  styles.itemContainer,
                  { width: itemWidth },
                ]}
              >
                <View style={[styles.iconWrapper, { width: iconBaseSize, height: iconBaseSize * (91/87) }]}>
                  <AchievementIconBase
                    size={iconBaseSize}
                    starsAchieved={achievement.starsAchieved}
                  />

                  <View style={styles.centerIcon}>
                    <MaterialCommunityIcons
                      name={achievement.iconName as any}
                      size={iconMCI_Size}
                      color={mciIconColor}
                    />
                  </View>
                </View>
                <Text style={styles.labelText}>{achievement.label}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: height * 0.01,
    paddingVertical: height * 0.01,
  },
  iconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  centerIcon: {
    position: 'absolute',
  },
  labelText: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    lineHeight: width * 0.035,
    textAlign: 'center',
    width: '100%',
  },
});

export default AchievementSection;