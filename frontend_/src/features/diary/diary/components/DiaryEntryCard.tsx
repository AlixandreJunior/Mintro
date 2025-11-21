import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { DiaryActivities } from './DiaryActivities';
import { DiaryEntryContent } from './DiaryEntryContent';
import { DiaryEntryHeader } from './DiaryEntryHeader';
import DiaryCard from './DiaryCard';
import DiaryModal from './DiaryModal';
import { Diary } from '@/share/types/mental/diary';

interface DiaryEntryCardProps {
  diary: Diary & {
    iconSource: React.ReactNode;
  };
}

export const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ diary }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const openDropdown = () => setDropdownVisible(true);
  const closeDropdown = () => setDropdownVisible(false);

  return (
    <>
      <Pressable onPress={closeDropdown}>
        <View style={styles.row}>
          <View style={styles.icon}>{diary.iconSource}</View>
          <DiaryCard style={styles.card}>
            <DiaryEntryHeader
              mood={diary.mood}
              time={diary.created_at.getHours()}
              onOpenMenu={openDropdown}
            />
            <DiaryActivities activities={diary.activities} />
            <DiaryEntryContent
              title={diary.title}
              content={diary.content}
              photoUrl={diary.photo}
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
