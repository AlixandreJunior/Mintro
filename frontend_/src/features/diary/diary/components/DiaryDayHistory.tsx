import React from 'react';
import { View, StyleSheet } from 'react-native';
import DiaryDateHeader from './DiaryDateHeader';
import DiaryTimelineLine from './DiaryTimelineLine';
import { groupEntriesByDay } from '../utils/group';
import { Diary } from '@/share/types/mental/diary';
import DiaryEntryCard from './DiaryEntryCard';

interface DiaryDayHistoryProps {
  entries: Diary[];
}

const DiaryDayHistory: React.FC<DiaryDayHistoryProps> = ({ entries }) => {
  const grouped = groupEntriesByDay(entries);

  return (
    <>
      {Object.entries(grouped).map(([day, dayEntries]) => (
        <View key={day} style={styles.daySection}>
          <DiaryDateHeader date={day} />

          <DiaryTimelineLine>
            {dayEntries.map((entry: any, index) => (
              <DiaryEntryCard key={index} diary={entry} />
            ))}
          </DiaryTimelineLine>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  daySection: {
    marginBottom: 24,
  },
});

export default DiaryDayHistory;
