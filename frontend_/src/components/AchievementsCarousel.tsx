import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AchievementIconBase from './icons/AchievementIcon';

const { width, height } = Dimensions.get('window');
const screenContentPaddingHorizontal = width * 0.05;
const itemSpacing = width * 0.02;
const itemWidth =
  (width - 2 * screenContentPaddingHorizontal - 2 * itemSpacing) / 3;

interface BackendAchievement {
  id: number | string;
  name: string;
  description: string;
  levels: {
    id: number | string;
    level: number;
    condition: string;
    description: string;
  }[];
}

interface AchievementProgress {
  id: number | string;
  user: number | string;
  achievement_level: {
    id: number | string;
    achievement: number | string;
    level: number;
    condition: string;
    description: string;
  };
  date_awarded: string;
}

interface Achievement {
  id: string;
  iconName: string;
  label: string;
  starsAchieved: number;
  totalStars: number;
  isUnlocked: boolean;
  primaryColor?: string;
  iconColor?: string;
}

interface AchievementsCarouselProps {
  achievements: BackendAchievement[];
  userAchievements: AchievementProgress[];
}

const AchievementsCarousel: React.FC<AchievementsCarouselProps> = ({
  achievements,
  userAchievements,
}) => {
  // Mapa para progresso máximo por achievement id
  const progressMap = useMemo(() => {
    const map = new Map<string, number>();
    userAchievements.forEach((progress) => {
      const achId = String(progress.achievement_level.achievement);
      const level = progress.achievement_level.level;
      const currentMax = map.get(achId) ?? 0;
      if (level > currentMax) {
        map.set(achId, level);
      }
    });
    return map;
  }, [userAchievements]);

  const parsedAchievements: Achievement[] = useMemo(() => {
    return achievements.map((ach) => {
      const achId = String(ach.id);
      const starsAchieved = progressMap.get(achId) ?? 0;
      return {
        id: achId,
        iconName: 'trophy',
        label: ach.name,
        starsAchieved,
        totalStars: ach.levels.length,
        isUnlocked: starsAchieved > 0,
        primaryColor: '#79D457',
      };
    });
  }, [achievements, progressMap]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conquistas</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={parsedAchievements}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          const iconBaseSize = itemWidth * 0.9;
          const iconMCI_Size = iconBaseSize * 0.45;

          // Mantém o ícone cinza até a primeira estrela ser conquistada
          const mciIconColor = item.starsAchieved > 0 ? '#79D457' : '#A0A0A0';

          return (
            <View
              style={[
                styles.itemContainer,
                { width: itemWidth },
                index < parsedAchievements.length - 1
                  ? { marginRight: itemSpacing }
                  : null,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { width: iconBaseSize, height: iconBaseSize * (91 / 87) },
                ]}
              >
                <AchievementIconBase
                  size={iconBaseSize}
                  starsAchieved={item.starsAchieved}
                />
                <View style={styles.centerIcon}>
                  <MaterialCommunityIcons
                    name="trophy"
                    size={iconMCI_Size}
                    color={mciIconColor}
                  />
                </View>
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AchievementsCarousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: height * 0.01,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingHorizontal: screenContentPaddingHorizontal,
  },
  title: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
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
  label: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    lineHeight: width * 0.035,
    textAlign: 'center',
    color: '#000000',
    width: '100%',
    minHeight: width * 0.07,
  },
});
