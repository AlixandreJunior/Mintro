import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AchievementIconBase from './Icons/AchievementIcon';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const screenContentPaddingHorizontal = width * 0.05;
const itemSpacing = width * 0.02;
const itemWidth = (width - (2 * screenContentPaddingHorizontal) - (2 * itemSpacing)) / 3;

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
  achievements: Achievement[];
}

const AchievementsCarousel: React.FC<AchievementsCarouselProps> = ({ achievements }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conquistas</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isUnlockedAndAchieved = item.isUnlocked && item.starsAchieved > 0;
          const baseSvgColor = isUnlockedAndAchieved ? (item.primaryColor || '#4CAF50') : '#A0A0A0';
          const mciIconColor = isUnlockedAndAchieved ? (item.iconColor || '#FFF') : '#A0A0A0';
          const iconBaseSize = itemWidth * 0.9;
          const iconMCI_Size = iconBaseSize * 0.45;

          return (
            <View
              style={[
                styles.itemContainer,
                { width: itemWidth },
                index < achievements.length - 1 ? { marginRight: itemSpacing } : null
              ]}
            >
              <View style={[styles.iconWrapper, { width: iconBaseSize, height: iconBaseSize * (91 / 87) }]}>
                <AchievementIconBase size={iconBaseSize} />
                <View style={styles.centerIcon}>
                  <MaterialCommunityIcons
                    name={item.iconName as any}
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
  },
  title: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
  },
  showAll: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins_400Regular',
    color: '#1FB6FF',
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
  dynamicStarsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -width * 0.008,
    width: '100%',
    justifyContent: 'center',
  },
  dynamicStarIcon: {
    marginHorizontal: width * 0.005,
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


