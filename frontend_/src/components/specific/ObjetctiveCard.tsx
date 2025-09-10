import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CompletionIcon from '../icons/CompletionIon';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseCard from '../ui/card/BaseCard';

interface ObjectiveCardProps {
  title: string;
  subtitle: string;
  activityName: string; // Para o ícone do livro ou outro
}

const { width } = Dimensions.get('window');

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  title,
  subtitle,
  activityName,
}) => {
  const activityIcon = getActivityIconName(activityName, 22);

  return (
    <BaseCard style={styles.card}>
      {/* Left Section: Checkbox + Activity Icon */}
      <View style={styles.leftSection}>
        <View style={styles.checkWrapper}>
          <CompletionIcon size={13} checkmarkColor="#8C8D8F" />
        </View>
        <View style={styles.iconWrapper}>{activityIcon}</View>
      </View>

      {/* Middle Section: Texts */}
      <View style={styles.middleSection}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      {/* Right Section: Arrow */}
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color="rgba(0,0,0,0.7)"
      />
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 32, // margem de 16px dos lados
    minHeight: 60,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkWrapper: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    marginLeft: 14,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 28,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 28,
    marginTop: 0,
  },
});

export default ObjectiveCard;
