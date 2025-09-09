import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseCard from './card/BaseCard';

const ObjectiveCard = () => {
  return (
    <BaseCard>
      <View style={internalStyles.container}>
        <View style={internalStyles.leftSection}>
          <View style={internalStyles.checkboxPlaceholder} />
        </View>
        <View style={internalStyles.middleSection}>
          <Text style={internalStyles.titleText}>Ler</Text>
          <Text style={internalStyles.subtitleText}>Sequencia de 2 dias</Text>
        </View>
        <View style={internalStyles.rightSection}>
          <Text style={internalStyles.arrowText}>›</Text>
        </View>
      </View>
    </BaseCard>
  );
};

const internalStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  leftSection: {
    marginRight: 12,
  },
  checkboxPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  middleSection: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B7280',
  },
  rightSection: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});

export default ObjectiveCard;
