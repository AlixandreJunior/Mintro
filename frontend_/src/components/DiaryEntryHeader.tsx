// DiaryEntryHeader.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VerticalDotsIcon from './icons/VerticalDotsIcon';

interface DiaryEntryHeaderProps {
  mood: string;
  time: string;
  onOpenMenu: () => void;
}

export const DiaryEntryHeader: React.FC<DiaryEntryHeaderProps> = ({
  mood,
  time,
  onOpenMenu,
}) => (
  <View style={styles.header}>
    <Text style={[styles.mood, { color: '#207700' }]}>{mood}</Text>
    <View style={styles.dotsContainer}>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mood: { fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  dotsButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    transform: [{ rotate: '90deg' }],
  },
  time: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'rgba(2,2,2,0.5)',
  },
});
