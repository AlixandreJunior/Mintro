import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardActions from '@/share/components/CardActions';
import { getReminderIconName } from '../utils/reminderIconMapper';
import HealthCard from '@/share/components/HealthCard';

interface ReminderCardProps {
  title: string;
  date: string;
  time: string;
  isDaily: boolean;
  type: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  title,
  date,
  time,
  isDaily,
  type,
  onEdit,
  onDelete,
}) => {
  const iconName = getReminderIconName(type);
  const timeOnly = new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const displayDate = isDaily
    ? `Horário: ${timeOnly}`
    : `Data: ${date} ${timeOnly}`;

  return (
    <HealthCard style={styles.card}>
      <View style={styles.leftSection}>
        <MaterialCommunityIcons name={iconName} size={24} color="#4F46E5" />
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dateText}>{displayDate}</Text>
      </View>

      <CardActions onEdit={onEdit} onDelete={onDelete} />
    </HealthCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 4,
  },
  leftSection: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default ReminderCard;
