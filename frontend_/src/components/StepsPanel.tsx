import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressCircle } from './icons/ProgressCircle';
import ShoeIcon from './icons/ShoeIcon';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface StepsPanelProps {
  currentDayStats: {
    distance: number;
    steps: number;
    kcal: number;
  };
}

export const StepsPanel: React.FC<StepsPanelProps> = ({
  currentDayStats,
}) => {
  return (
    <TouchableOpacity
      style={styles.mainStats}
      onPress={() => router.push('/steps')}
    >
      <View style={styles.sideStatItem}>
        <View
          style={[styles.progressContainer, styles.sideStatProgressContainer]}
        >
          <ProgressCircle
            progress={Math.min((currentDayStats.distance / 10) * 100, 100)}
            size={width * 0.18}
            color="#9CC9FF"
            strokeWidth={5}
          />
          <View style={styles.progressContent}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#3B82F6"
            />
          </View>
        </View>
        <Text style={styles.sideStatValue}>{currentDayStats.distance}</Text>
        <Text style={styles.sideStatLabel}>km</Text>
      </View>

      <View style={styles.mainStatItem}>
        <View
          style={[styles.progressContainer, styles.mainStatProgressContainer]}
        >
          <ProgressCircle
            progress={Math.min(currentDayStats.steps / 100, 100)}
            size={width * 0.25}
            color="#9CC9FF"
            strokeWidth={6}
          />
          <View style={styles.progressContent}>
            <ShoeIcon size={24} />
          </View>
        </View>
        <Text style={styles.mainStatValue}>{currentDayStats.steps}</Text>
        <Text style={styles.mainStatLabel}>passos</Text>
      </View>

      <View style={styles.sideStatItem}>
        <View
          style={[styles.progressContainer, styles.sideStatProgressContainer]}
        >
          <ProgressCircle
            progress={Math.min(currentDayStats.kcal / 20, 100)}
            size={width * 0.18}
            color="#9CC9FF"
            strokeWidth={5}
          />
          <View style={styles.progressContent}>
            <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
          </View>
        </View>
        <Text style={styles.sideStatValue}>{currentDayStats.kcal}</Text>
        <Text style={styles.sideStatLabel}>kcal</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
    minHeight: height * 0.25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainStatItem: {
    alignItems: 'center',
    flex: 1,
  },
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
  mainStatProgressContainer: {
    marginBottom: 0,
  },
  sideStatProgressContainer: {
    marginBottom: -0,
  },
});
