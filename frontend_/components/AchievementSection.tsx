import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

interface AchievementSectionProps{

}

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  iconName: string;
  label: string;
  starsAchieved: number;
  totalStars: number;
  isUnlocked: boolean;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', iconName: 'leaf', label: 'Bem-vindo ao Mintrow', starsAchieved: 3, totalStars: 3, isUnlocked: true },
  { id: '2', iconName: 'medal', label: 'Lenda do Mintrow', starsAchieved: 1, totalStars: 3, isUnlocked: true },
  { id: '3', iconName: 'fire', label: 'Persistente', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '4', iconName: 'dumbbell', label: 'Foco Total', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '5', iconName: 'water', label: 'Gota a Gole', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '6', iconName: 'shoe-sneaker', label: 'Passos de Consciência', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '7', iconName: 'meditation', label: 'Zen Total', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '8', iconName: 'book-open-page-variant', label: 'Narrador da própria história', starsAchieved: 0, totalStars: 3, isUnlocked: false },
  { id: '9', iconName: 'target', label: 'Objetivo Marcado', starsAchieved: 0, totalStars: 3, isUnlocked: false },
];

const AchievementSection: React.FC<AchievementSectionProps> = ({

}) => {
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.gridContainer}>
            {MOCK_ACHIEVEMENTS.map((achievement) => {
                const itemSize = width / 3.5;
                return (
                <View
                    key={achievement.id}
                    style={[styles.itemContainer, { width: itemSize, height: itemSize * 1.2 }]}
                >
                    <View
                    style={[
                        styles.iconCircle,
                        !achievement.isUnlocked && styles.iconCircleLocked,
                        achievement.isUnlocked && styles.iconCircleUnlocked,
                    ]}
                    >
                    <MaterialCommunityIcons
                        name={achievement.iconName as any}
                        size={itemSize * 0.4}
                        color={achievement.isUnlocked ? '#4CAF50' : '#A0A0A0'}
                    />
                    </View>
                    <Text style={styles.labelText}>{achievement.label}</Text>
                    <View style={styles.starsContainer}>
                    {[...Array(achievement.totalStars)].map((_, i) => (
                        <MaterialCommunityIcons
                        key={i}
                        name={i < achievement.starsAchieved ? 'star' : 'star-outline'}
                        size={itemSize * 0.12}
                        color={
                            achievement.isUnlocked && i < achievement.starsAchieved
                            ? '#FFD700'
                            : '#A0A0A0'
                        }
                        style={styles.starIcon}
                        />
                    ))}
                    </View>
                </View>
                );
            })}
            </View>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    alignItems: 'center',
    margin: width * 0.02,
  },
  iconCircle: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: (width * 0.22) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 5,
  },
  iconCircleUnlocked: {
    borderColor: '#4CAF50',
  },
  iconCircleLocked: {
    borderColor: '#A0A0A0',
  },
  labelText: {
    fontSize: width * 0.032,
    textAlign: 'center',
    color: '#333',
    minHeight: 32,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  starIcon: {
    marginHorizontal: 1,
  },
})

export default AchievementSection