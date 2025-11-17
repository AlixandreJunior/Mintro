import React from 'react';
import { View, StyleSheet } from 'react-native';
import DiaryDateHeader from './DiaryDateHeader';
import DiaryTimelineLine from './DiaryTimelineLine';
import { DiaryEntryCard } from '../DiaryEntryCard';

interface DiaryDayHistoryProps {
  date: string;
  entries: any[];
}

const DiaryDayHistory: React.FC<DiaryDayHistoryProps> = ({ date, entries }) => {
  return (
    <View style={styles.daySection}>
      <DiaryDateHeader date={date} />

      <DiaryTimelineLine>
        {entries.map((entry, entryIndex) => (
          <DiaryEntryCard
            key={entryIndex}
            id={entry.id}
            time={entry.time}
            mood={entry.mood}
            iconSource={entry.iconSource}
            activities={entry.activities}
            title={entry.title}
            content={entry.content}
            photoUrl={entry.photoUrl}
          />
        ))}
      </DiaryTimelineLine>
    </View>
  );
};

const styles = StyleSheet.create({
  daySection: {
    marginBottom: 24,
  },
});

export default DiaryDayHistory;
