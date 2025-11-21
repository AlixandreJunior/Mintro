import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressCircle from '@/share/components/ProgressCircle';

const { width } = Dimensions.get('window');

interface StepsKcalPanelProps {
  kcal: number;
}

export const StepsKcalPanel: React.FC<StepsKcalPanelProps> = ({ kcal }) => {
  return (
    <View style={styles.sideStatItem}>
      <View
        style={[styles.progressContainer, styles.sideStatProgressContainer]}
      >
        <ProgressCircle
          progress={Math.min(kcal / 20, 100)}
          size={width * 0.18}
          color="#9CC9FF"
          strokeWidth={5}
        />
        <View style={styles.progressContent}>
          <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
        </View>
      </View>
      <Text style={styles.sideStatValue}>{kcal}</Text>
      <Text style={styles.sideStatLabel}>kcal</Text>
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
    marginBottom: 12,
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
    marginBottom: 4,
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
