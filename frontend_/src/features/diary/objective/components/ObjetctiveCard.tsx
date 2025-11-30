import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { getActivityIconName } from '@/share/utils/activityIconMapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseCard from '@/share/components/ui/card/BaseCard';
import CompletionIcon from '@/share/components/icons/CompletionIon';

interface ObjectiveCardProps {
  title: string;
  subtitle: string;
  activityName: string;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  title,
  subtitle,
  activityName,
}) => {
  const activityIcon = getActivityIconName(activityName, 19);

  return (
    <BaseCard style={styles.card}>
      <View style={styles.leftSection}>
        <CompletionIcon size={24} checkmarkColor="#8C8D8F" />
        <View style={styles.iconWrapper}>{activityIcon}</View>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color="#374151" />
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginVertical: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    marginLeft: 14,
  },
  titleText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 28,
    color: '#000000',
  },
  subtitleText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    lineHeight: 28,
    color: '#000000',
    marginTop: -4,
  },
  chevron: {
    marginLeft: 8,
  },
});

export default ObjectiveCard;
