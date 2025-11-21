import React from 'react';
import { View } from 'react-native';
import { HydratationCard } from '@/features/health/hydration/components/HydratationCard';
import { StepsPanel } from '../../step/components/StepsPanel';
import { ActivitiesCardSection } from '@/features/health/exercise/components/ActivitiesCardSection';

interface HealthStatsProps {
  currentDate: Date;
}

export function HealthStats({ currentDate }: HealthStatsProps) {
  return (
    <View>
      <StepsPanel date={currentDate} />
      <HydratationCard date={currentDate} />
      <ActivitiesCardSection currentDate={currentDate} />
    </View>
  );
}
