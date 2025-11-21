import React from 'react';
import { View } from 'react-native';
import { HydratationCard } from '@/features/health/hydration/components/HydratationCard';
import { ActivitiesCardSection } from '../../features/health/exercise/components/ActivitiesCardSection';
import { StepsPanel } from '@/features/health/step/components/StepsPanel';

interface Props {
  currentDate: Date;
}

export function HealthStats({ currentDate }: Props) {
  return (
    <View>
      <StepsPanel date={currentDate} />
      <HydratationCard date={currentDate} />
      <ActivitiesCardSection currentDate={currentDate} />
    </View>
  );
}
