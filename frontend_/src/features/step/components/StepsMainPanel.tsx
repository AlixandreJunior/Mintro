import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ProgressCircle } from '../../share/components/icons/ProgressCircle';
import ShoeIcon from '../../share/components/icons/ShoeIcon';
import React from 'react';

const { width, height } = Dimensions.get('window');

interface StepsMainPanelProps {
  steps: number;
}

export const StepsMainPanel: React.FC<StepsMainPanelProps> = ({ steps }) => {
  return (
    <View style={styles.mainStatItem}>
      <View
        style={[styles.progressContainer, styles.mainStatProgressContainer]}
      >
        <ProgressCircle
          progress={Math.min(steps / 100, 100)}
          size={width * 0.25}
          color="#9CC9FF"
          strokeWidth={6}
        />
        <View style={styles.progressContent}>
          <ShoeIcon size={24} />
        </View>
      </View>
      <Text style={styles.mainStatValue}>{steps}</Text>
      <Text style={styles.mainStatLabel}>passos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStatItem: {
    alignItems: 'center',
    flex: 1,
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
  mainStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  mainStatProgressContainer: {
    marginBottom: 0,
  },
});
