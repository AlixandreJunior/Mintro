import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import DiaryCard from './specific/DiaryCard';
import DiaryModal from './specific/DiaryModal';
import { DiaryEntryHeader } from '../DiaryEntryHeader';
import { DiaryActivities } from './DiaryActivities';
import { DiaryEntryContent } from './DiaryEntryContent';

interface DiaryEntryCardProps {
  id: number;
  time: string;
  mood: string;
  iconSource: React.ReactNode;
  activities: { name: string }[];
  title: string;
  content: string;
  photoUrl?: string;
}

export const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({
  time,
  mood,
  iconSource,
  activities,
  title,
  content,
  photoUrl,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const openDropdown = () => setDropdownVisible(true);
  const closeDropdown = () => setDropdownVisible(false);

  return (
    <>
      <Pressable onPress={closeDropdown}>
        <View style={styles.row}>
          <View style={styles.icon}>{iconSource}</View>
          <DiaryCard style={styles.card}>
            <DiaryEntryHeader
              mood={mood}
              time={time}
              onOpenMenu={openDropdown}
            />
            <DiaryActivities activities={activities} />
            <DiaryEntryContent
              title={title}
              content={content}
              photoUrl={photoUrl}
            />
          </DiaryCard>
        </View>
      </Pressable>

      <DiaryModal
        visible={dropdownVisible}
        onClose={closeDropdown}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: { marginLeft: 49, maxWidth: screen.width - 65 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
