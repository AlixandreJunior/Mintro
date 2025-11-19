import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VerticalDotsIcon from '@/share/components/icons/VerticalDotsIcon';

interface DiaryEntryHeaderProps {
  mood: string;
  time: number | string;
  onOpenMenu: () => void;
  moodColor?: string;
}

export const DiaryEntryHeader: React.FC<DiaryEntryHeaderProps> = ({
  mood,
  time,
  onOpenMenu,
  moodColor = '#207700',
}) => {
  const styles = createStyles(moodColor);

  return (
    <View style={styles.header}>
      <Text style={styles.mood}>{mood}</Text>

      <View style={styles.rightContainer}>
        <Text style={styles.time}>{time}</Text>

        <TouchableOpacity
          onPress={onOpenMenu}
          activeOpacity={0.7}
          style={styles.dotsButton}
        >
          <VerticalDotsIcon size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (moodColor: string) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },

    mood: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 14,
      color: moodColor,
    },

    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    time: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      color: 'rgba(2,2,2,0.5)',
    },

    dotsButton: {
      padding: 4,
      transform: [{ rotate: '90deg' }],
    },
  });
