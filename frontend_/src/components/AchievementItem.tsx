import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AchievementIconBase from './icons/AchievementIcon';

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
  starsAchieved,
  itemWidth,
  marginRight,
}) => {
  const iconBaseSize = itemWidth * 0.9;
  const iconMCI_Size = iconBaseSize * 0.45;
  const mciIconColor = starsAchieved > 0 ? '#79D457' : '#A0A0A0';

  return (
    <View style={[styles.container, { width: itemWidth, marginRight }]}>
      <View
        style={[
          styles.iconWrapper,
          { width: iconBaseSize, height: iconBaseSize * (91 / 87) },
        ]}
      >
        <AchievementIconBase
          size={iconBaseSize}
          starsAchieved={starsAchieved}
        />
        <View style={styles.centerIcon}>
          <MaterialCommunityIcons
            name="trophy"
            size={iconMCI_Size}
            color={mciIconColor}
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
