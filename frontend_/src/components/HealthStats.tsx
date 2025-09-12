import React from 'react';
import { View } from 'react-native';
import { HydratationCard } from '@/components/HydratationCard';
import { StepsPanel } from './StepsPanel';
import { ActivitiesCardSection } from './ActivitiesCardSection';

interface Props {
  currentDate: Date;
}

export function HealthStats({ currentDate }: Props) {
  return (
    <View>
      <StepsPanel date={currentDate}/>
      <HydratationCard
        date={currentDate}
      />
      <ActivitiesCardSection currentDate={currentDate}/>
    </View>
  );
}
