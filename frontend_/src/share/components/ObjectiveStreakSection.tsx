import React from 'react';
import { FireIcon } from './icons/FireIcon';
import ObjectiveInfoCardSection from './ObjectiveInfoCardSection';

interface ObjectiveStreakSectionProps {
  current: number;
  longest: number;
}

const ObjectiveStreakSection: React.FC<ObjectiveStreakSectionProps> = ({
  current,
  longest,
}) => {
  return (
    <ObjectiveInfoCardSection
      title="Sequência"
      items={[
        {
          value: current,
          label: 'Sequência Atual',
          icon: <FireIcon size={18} color="#DFB300" />,
        },
        {
          value: longest,
          label: 'Sequência Mais Longa',
          icon: <FireIcon size={18} color="#008ADF" />,
        },
      ]}
    />
  );
};

export default ObjectiveStreakSection;
