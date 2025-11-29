import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface StepsSidePanelProps {
  value: number;
  label: string;
  icon: 'fire' | 'map-marker';
  color?: string;
}

export const StepsSidePanel: React.FC<StepsSidePanelProps> = ({
  value,
  label,
  icon,
  color = '#000',
}) => {
  return (
    <View style={styles.sideStatItem}>
      <View
        style={[styles.progressContainer, styles.sideStatProgressContainer]}
      >
        <View style={styles.progressContent}>
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
      </View>
      <Text style={styles.sideStatValue}>{value.toFixed(2)}</Text>
      <Text style={styles.sideStatLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sideStatItem: {
    alignItems: 'center',
    flex: 0.8,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
  },
  sideStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  sideStatProgressContainer: {
    marginBottom: -0,
  },
});
