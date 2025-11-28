import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import ObjectiveCard from './ObjetctiveCard';

interface ObjectiveDisplayCardProps {
  objectiveTitle: string;
  objectiveSubtitle: string;
  onPress?: () => void;
}

const ObjectiveDisplayCard: React.FC<ObjectiveDisplayCardProps> = ({
  objectiveTitle,
  objectiveSubtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 15 }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ObjectiveCard
        activityName={objectiveTitle}
        subtitle={objectiveSubtitle}
        title={objectiveTitle}
      />
    </TouchableOpacity>
  );
};

export default ObjectiveDisplayCard;
