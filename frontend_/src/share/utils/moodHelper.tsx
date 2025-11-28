import React from 'react';
import { Image } from 'react-native';
import { MoodType } from '../types/mental/diary';

interface MoodVisuals {
  iconSource: React.ReactNode;
}

export function getMoodVisuals(mood: MoodType): MoodVisuals {
  switch (mood) {
    case 'Excelente':
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_excellent.png')} />
        ),
      };
    case 'Bom':
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_good.png')} />
        ),
      };
    case 'Neutro':
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_neutral.png')} />
        ),
      };
    case 'Ruim':
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_bad.png')} />
        ),
      };
    case 'Péssimo':
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_verybad.png')} />
        ),
      };
    default:
      return {
        iconSource: (
          <Image source={require('../assets/images/mintro_neutral.png')} />
        ),
      };
  }
}
