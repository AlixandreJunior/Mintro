import MintroExcellentIcon from '@/components/Icons/MintroExcellentIcon';
import { MoodType } from '@/types/mental/diary';
import React from 'react';

interface MoodVisuals {
  iconSource: React.ReactNode;
}

export function getMoodVisuals(mood: MoodType): MoodVisuals {
  switch (mood) {
    case 'Excelente':
      return {
        iconSource: <MintroExcellentIcon />,
      };
    case 'Bom':
      return {
        iconSource: <MintroExcellentIcon />,
      };
    case 'Neutro':
      return {
        iconSource: <MintroExcellentIcon />,
      };
    case 'Ruim':
      return {
        iconSource: <MintroExcellentIcon />,
      };
    case 'Péssimo':
      return {
        iconSource: <MintroExcellentIcon />,
      };
    default:
      return {
        iconSource: <MintroExcellentIcon />,
      };
  }
}
