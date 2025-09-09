import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { MoodType } from '@/src/types/mental/diary';
import { getActivityIconName } from '@/src/utils/activityIconMapper';
import { router } from 'expo-router';
import { useDiaryForm } from '@/src/hooks/forms/useDiaryForm';
import VerticalDotsIcon from './icons/VerticalDotsIcon';
import DiaryModal from './specific/DiaryModal';
import BaseCard from './Cards/BaseCard';
import DiaryCard from './Cards/DiaryCard';

const screen = Dimensions.get('window');

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
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const dotsButtonRef = useRef<any>(null);
  const { handleDelete } = useDiaryForm();

  const openDropdown = () => {
    if (
      dotsButtonRef.current &&
      typeof dotsButtonRef.current.measureInWindow === 'function'
    ) {
      dotsButtonRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setMenuPos({ x, y, width, height });
          setDropdownVisible(true);
        }
      );
    } else {
      setMenuPos({ x: screen.width - 160, y: 120, width: 40, height: 24 });
      setDropdownVisible(true);
    }
  };

  const closeDropdown = () => setDropdownVisible(false);

  const onEdit = () => {
    // @ts-ignore
    router.push(`/diary/${id}`);
    closeDropdown();
  };

  const onDelete = async () => {
    await handleDelete(id);
    closeDropdown();
  };

  const menuWidth = 160;
  const menuMarginTop = 6;
  let menuLeft = menuPos.x + menuPos.width - menuWidth;
  if (menuLeft < 8) menuLeft = 8;
  if (menuLeft + menuWidth > screen.width - 8)
    menuLeft = screen.width - menuWidth - 8;

  const availableBelow = screen.height - (menuPos.y + menuPos.height);
  const menuTopCandidate = menuPos.y + menuPos.height + menuMarginTop;
  const menuHeightEstimate = 88;
  const menuTop =
    availableBelow >= menuHeightEstimate
      ? menuTopCandidate
      : Math.max(8, menuPos.y - menuHeightEstimate - menuMarginTop);

  return (
    <>
      <Pressable onPress={closeDropdown}>
        <View style={styles.timelineRow}>
          <View style={styles.timelineIconContainer}>{iconSource}</View>

          <DiaryCard style={{ marginLeft: 49, maxWidth: screen.width - 65 }}>
            <View style={styles.entryHeader}>
              <View style={styles.entryInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={[styles.moodText, { color: '#207700' }]}>
                    {mood}
                  </Text>

                  <View style={styles.dotsContainer}>
                    <Text style={styles.timeText}>{time}</Text>

                    <TouchableOpacity
                      ref={(ref) => {
                        dotsButtonRef.current = ref;
                      }}
                      onPress={(e) => {
                        e.stopPropagation?.();
                        openDropdown();
                      }}
                      activeOpacity={0.7}
                      style={styles.dotsButton}
                    >
                      <VerticalDotsIcon size={15} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.activitiesContainer}>
                  {activities.map((activity, index) => (
                    <View
                      key={index}
                      style={[styles.activityChip, { maxWidth: '45%' }]}
                    >
                      {getActivityIconName(activity.name, 10)}
                      <Text style={styles.activityChipText}>
                        {activity.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <Text
              style={styles.entryTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text style={styles.entryContent}>{content}</Text>

            {photoUrl && (
              <Image
                source={{ uri: photoUrl }}
                style={[styles.diaryPhoto, { maxHeight: screen.width * 0.5 }]}
              />
            )}
          </DiaryCard>
        </View>
      </Pressable>

      <DiaryModal
        visible={dropdownVisible}
        top={menuTop}
        left={menuLeft}
        width={menuWidth}
        onClose={closeDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryInfo: {
    flex: 1,
  },
  moodText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 1,
    marginRight: 6,
  },
  activityChipText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#2B2B2B',
    marginLeft: 4,
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  dotsButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    transform: [{ rotate: '90deg' }],
  },
  timeText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 20,
    color: 'rgba(2, 2, 2, 0.5)',
  },
  entryTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#2B2B2B',
    marginBottom: 4,
    marginTop: 8,
  },
  entryContent: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    lineHeight: 14,
    color: '#2B2B2B',
  },
  diaryPhoto: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginTop: 12,
    resizeMode: 'contain',
  },
});

export default DiaryEntryCard;
