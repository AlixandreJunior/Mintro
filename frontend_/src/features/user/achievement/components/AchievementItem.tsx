import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AchievementIconBase from '@/share/components/icons/AchievementIcon';

const { width, height } = Dimensions.get('window');

interface AchievementItemProps {
  label: string;
  starsAchieved: number;
  totalStars: number;
  itemWidth: number;
  marginRight?: number;
}

export const AchievementItem: React.FC<AchievementItemProps> = ({
  label,
  starsAchieved = 3,
  itemWidth,
  marginRight,
}) => {
  const { iconBaseSize, iconSize, trophyColor, wrapperSize } = useMemo(() => {
    const base = itemWidth * 0.9;
    return {
      iconBaseSize: base,
      iconSize: base * 0.45,
      trophyColor: starsAchieved > 0 ? '#79D457' : '#A0A0A0',
      wrapperSize: { width: base, height: base * (91 / 87) },
    };
  }, [itemWidth, starsAchieved]);

  return (
    <View style={[styles.container, { width: itemWidth, marginRight }]}>
      <View style={[styles.iconWrapper, wrapperSize]}>
        <AchievementIconBase
          size={iconBaseSize}
          starsAchieved={starsAchieved}
        />

        <View style={styles.centerIcon}>
          <MaterialCommunityIcons
            name="trophy"
            size={iconSize}
            color={trophyColor}
          />
        </View>
      </View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
    lineHeight: width * 0.035,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    minHeight: width * 0.07,
  },
});
