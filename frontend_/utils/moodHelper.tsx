import { MoodType } from '@/types/mental/diary';
import ExcellentIcon from '../assets/images/mintro_excellent.svg';
import GoodIcon from '../assets/images/mintro_good.svg';
import NeutralIcon from '../assets/images/mintro_neutral.svg';
import BadIcon from '../assets/images/mintro_bad.svg';
import VeryBadIcon from '../assets/images/mintro_verybad.svg';
import React from 'react';

interface MoodVisuals {
  iconSource: React.ReactNode;
}

export function getMoodVisuals(mood: MoodType): MoodVisuals {
  switch (mood) {
    case 'Excelente':
      return {
        iconSource: <ExcellentIcon />,
      };
    case 'Bom':
      return {
        iconSource: <GoodIcon />,
      };
    case 'Neutro':
      return {
        iconSource: <NeutralIcon />,
      };
    case 'Ruim':
      return {
        iconSource: <BadIcon />,
      };
    case 'Péssimo':
      return {
        iconSource: <VeryBadIcon />,
      };
    default:
      return {
        iconSource: <NeutralIcon />,
      };
  }
}
