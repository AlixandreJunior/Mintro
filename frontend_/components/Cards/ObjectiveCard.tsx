import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CompletionIcon from '../Icons/CompletionIon';
import { getActivityIconName } from '@/utils/activityIconMapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseCard from './BaseCard';
import ObjectiveCard from './ObjetctiveCard';

interface ObjectiveDisplayCardProps {
  objectiveTitle: string;
  objectiveSubtitle: string;
  onPress?: (event_: any) => void;
}

const { width } = Dimensions.get('window');

const ObjectiveDisplayCard: React.FC<ObjectiveDisplayCardProps> = ({
  objectiveTitle,
  objectiveSubtitle,
  onPress,
}) => {
  const icon = getActivityIconName(objectiveTitle, 20);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ObjectiveCard style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.checkWrapper}>
            <CompletionIcon />
          </View>
          <View style={styles.iconWrapper}>{icon}</View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>{objectiveTitle}</Text>
          <Text style={styles.subtitle}>{objectiveSubtitle}</Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="rgba(0, 0, 0, 0.7)"
        />
      </ObjectiveCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    marginVertical: 2,
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
  textSection: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    lineHeight: 18,
    marginTop: -2,
  },
});

export default ObjectiveDisplayCard;
