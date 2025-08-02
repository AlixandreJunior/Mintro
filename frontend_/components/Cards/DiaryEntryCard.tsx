import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from 'react-native';
import { MoodType } from '@/types/mental/diary';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { router } from 'expo-router';
import { deleteDiary } from '@/services/diary/deleteDiary';
import { useDiary } from '@/hooks/useDiary';
import { useDiaryForm } from '@/hooks/forms/useDiaryForm';

// Ícone simples dots vertical com 3 círculos
const VerticalDotsIcon = () => (
  <View style={styles.dotsIconContainer}>
    <View style={styles.dot} />
    <View style={styles.dot} />
    <View style={styles.dot} />
  </View>
);

interface TransformedActivity {
  name: string;
}

interface DiaryEntryCardProps {
  id: number;
  time: string;
  mood: MoodType;
  iconSource: any;
  activities: TransformedActivity[];
  title: string;
  content: string;
  photoUrl?: string;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({
  id,
  time,
  mood,
  iconSource,
  activities,
  title,
  content,
  photoUrl,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { handleDelete } = useDiaryForm();
  const handleOutsidePress = () => setDropdownVisible(false);

  const onEdit = () => {
    //@ts-ignore
    router.push(`/diary/${id}`);
    setDropdownVisible(false);
    console.log('Editar diário');
  };

  const onDelete = async () => {
    await handleDelete(id);
    setDropdownVisible(false);
    console.log('deletar diário');
  };

  return (
    <Pressable onPress={handleOutsidePress}>
      <View style={styles.timelineRow}>
        <View style={styles.timelineIconContainer}>{iconSource}</View>

        <View style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <View style={styles.entryInfo}>
              <Text style={styles.moodText}>{mood}</Text>
              <View style={styles.activitiesContainer}>
                {activities.map((activity, index) => (
                  <View key={index} style={styles.activityChip}>
                    {getActivityIconName(activity.name, 12)}
                    <Text style={styles.activityChipText}>{activity.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.dotsContainer}>
              <TouchableOpacity
                onPress={() => setDropdownVisible(!dropdownVisible)}
                activeOpacity={0.7}
                style={styles.dotsButton}
              >
                <VerticalDotsIcon />
              </TouchableOpacity>

              <Text style={styles.timeText}>{time}</Text>

              {dropdownVisible && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    onPress={onEdit}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onDelete}
                    style={[styles.dropdownItem]}
                  >
                    <Text style={[styles.dropdownText, { color: 'red' }]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.entryTitle}>{title}</Text>
          <Text style={styles.entryContent}>{content}</Text>

          {photoUrl && (
            <Image source={{ uri: photoUrl }} style={styles.diaryPhoto} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
  },
  timelineIconContainer: {
    position: 'absolute',
    left: -15,
    top: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  entryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginLeft: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryInfo: {
    flex: 1,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginBottom: 6,
    marginRight: 6,
  },
  activityChipText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  dotsContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  dotsButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dotsIconContainer: {
    width: 4,
    justifyContent: 'space-between',
    height: 20,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6B7280',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 28,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 999,
    minWidth: 100,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    marginTop: 12,
  },
  entryContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  diaryPhoto: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginTop: 15,
    resizeMode: 'contain',
  },
});

export default DiaryEntryCard;
