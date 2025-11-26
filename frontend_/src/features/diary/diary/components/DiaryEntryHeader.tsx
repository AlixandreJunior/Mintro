import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VerticalDotsIcon from '@/share/components/icons/VerticalDotsIcon';
import CardActions from '@/share/components/CardActions';

interface DiaryEntryHeaderProps {
  mood: string;
  time: number | string;
  onOpenMenu: () => void;
  moodColor?: string;
  onEdit?: (...args: any[]) => void;
  onDelete?: (...args: any[]) => void;
}

export const DiaryEntryHeader: React.FC<DiaryEntryHeaderProps> = ({
  mood,
  time,
  moodColor = '#207700',
  onDelete,
  onEdit,
}) => {
  const styles = createStyles(moodColor);

  return (
    <View style={styles.header}>
      <Text style={styles.mood}>{mood}</Text>

      <View style={styles.rightContainer}>
        <Text style={styles.time}>{time}</Text>

        <CardActions onDelete={onDelete} onEdit={onEdit} />
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
