import React from 'react';
import ObjectiveInfoCardSection from './ObjectiveInfoCardSection';

interface ObjectiveRateSectionProps {
  week_count: number;
  success_rate_avarege: number;
  repeat: number;
}

const ObjectiveRateSection: React.FC<ObjectiveRateSectionProps> = ({
  week_count,
  repeat,
  success_rate_avarege,
}) => {
  const currentWeekRate =
    repeat > 0 ? Math.min(100, Math.round((week_count / repeat) * 100)) : 0;

  return (
    <ObjectiveInfoCardSection
      title="Taxa de Sucesso"
      items={[
        {
          value: `${currentWeekRate}%`,
          label: 'Esta semana',
        },
        {
          value: `${success_rate_avarege}%`,
          label: 'Semanas Anteriores',
        },
      ]}
    />
  );
};

export default ObjectiveRateSection;
