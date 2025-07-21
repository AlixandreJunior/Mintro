import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import CompletionIcon from '../Icons/CompletionIon';

interface ObjectiveDisplayCardProps {
  objectiveTitle: string;
  objectiveSubtitle: string;
  renderIcon: React.ReactNode;
  onPress?: ((event_:any) => void)
}

const { width } = Dimensions.get('window');

const ObjectiveDisplayCard: React.FC<ObjectiveDisplayCardProps> = ({
  objectiveTitle,
  objectiveSubtitle,
  renderIcon,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.objectiveCard} onPress={onPress}>
      <View style={styles.objectiveLeft}>
        <View style={styles.checkboxContainer}>
          <CompletionIcon />
        </View>
        <View style={styles.iconWrapper}>
          {renderIcon}
        </View>
      </View>
      <View style={styles.objectiveContent}>
        <Text style={styles.objectiveTitle}>{objectiveTitle}</Text>
        <Text style={styles.objectiveSubtitle}>{objectiveSubtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  objectiveCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: width * 0.05, // Margem lateral responsiva
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 6,
    marginBottom: 16,
  },
  objectiveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6', // cinza claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    marginBottom: 1,
  },
  objectiveSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
});

export default ObjectiveDisplayCard;
