import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardActions from '@/share/components/CardActions';
import { getReminderIconName } from '../utils/reminderIconMapper';
import HealthCard from '@/share/components/HealthCard';

const { width } = Dimensions.get('window');
const scale = width / 390;

interface ReminderCardProps {
  title: string;
  content: string;
  date: string;
  time: string;
  isDaily: boolean;
  type: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const formatTime = (time: string): string => {
  try {
    const [hour, minute] = time.split(':').map(Number);
    return new Date(1970, 0, 1, hour, minute).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return time;
  }
};

const formatDate = (date: string): string => {
  try {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return date;
  }
};

const ReminderCard: React.FC<ReminderCardProps> = ({
  title,
  content,
  date,
  time,
  isDaily,
  type,
  onEdit,
  onDelete,
}) => {
  const iconName = getReminderIconName(type);

  const dateTimeInfo = useMemo(() => {
    const formattedTime = formatTime(time);
    const formattedDate = formatDate(date);

    return isDaily
      ? `Disparo Diário às ${formattedTime}`
      : `Data: ${formattedDate} às ${formattedTime}`;
  }, [date, time, isDaily]);

  const displayContent =
    content ||
    `Lembrete agendado para ${isDaily ? 'diariamente' : formatDate(date)}`;

  return (
    <View style={styles.cardContainer}>
      <HealthCard style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name={iconName}
              size={22 * scale}
              color="#6B7280"
            />
          </View>
        </View>

        <View style={styles.middleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
          </View>

          <Text style={styles.contentText} numberOfLines={1}>
            {content}
          </Text>

          <Text style={styles.schedulingInfoText}>{dateTimeInfo}</Text>
        </View>

        <View style={styles.rightSection}>
          <CardActions onEdit={onEdit} onDelete={onDelete} />
        </View>
      </HealthCard>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    marginVertical: 8 * scale,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(184, 230, 184, 0.2)',
    borderRadius: 16 * scale,
    paddingHorizontal: 17 * scale,
    paddingVertical: 17 * scale,
    minHeight: 98 * scale,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftSection: {
    marginRight: 12 * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48 * scale,
    height: 48 * scale,
    borderRadius: 9999 * scale,
    backgroundColor: 'rgba(127, 176, 105, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2 * scale,
  },
  titleText: {
    fontSize: 14 * scale,
    fontWeight: '500',
    color: '#000000',
  },
  contentText: {
    fontSize: 14 * scale,
    fontWeight: '400',
    color: '#4B5563',
    lineHeight: 20 * scale,
  },
  schedulingInfoText: {
    fontSize: 12 * scale,
    fontWeight: '400',
    color: '#9CA3AF',
    marginTop: 2 * scale,
  },
  rightSection: {
    marginLeft: 8 * scale,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ReminderCard;
