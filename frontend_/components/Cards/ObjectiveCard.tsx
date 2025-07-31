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
import MainCard from '../MainCard';

interface ObjectiveDisplayCardProps {
  objectiveTitle: string;
  objectiveSubtitle: string;
  onPress?: (event_: any) => void;
}

const { width, height } = Dimensions.get('window');

const ObjectiveDisplayCard: React.FC<ObjectiveDisplayCardProps> = ({
  objectiveTitle,
  objectiveSubtitle,
  onPress,
}) => {
  const icon = getActivityIconName(objectiveTitle);

  return (
    <MainCard>
      <TouchableOpacity style={styles.objectiveCard} onPress={onPress}>
        <View style={styles.objectiveLeft}>
          <View style={styles.checkboxContainer}>
            <CompletionIcon />
          </View>
          <View style={styles.iconWrapper}>{icon}</View>
        </View>
        <View style={styles.objectiveContent}>
          <Text style={styles.objectiveTitle}>{objectiveTitle}</Text>
          <Text style={styles.objectiveSubtitle}>{objectiveSubtitle}</Text>
        </View>
      </TouchableOpacity>
    </MainCard>
  );
};

const styles = StyleSheet.create({
  objectiveCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  objectiveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.035,
  },
  checkboxContainer: {
    width: width * 0.055,
    height: width * 0.055,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.025,
  },
  iconWrapper: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 8,
    backgroundColor: '#F3F4F6', // cinza claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: 1,
  },
  objectiveSubtitle: {
    fontSize: width * 0.03,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
});

export default ObjectiveDisplayCard;
