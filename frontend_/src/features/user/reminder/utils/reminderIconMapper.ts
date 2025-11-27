import { MaterialCommunityIcons } from '@expo/vector-icons';

export const getReminderIconName = (
  type: string
): keyof typeof MaterialCommunityIcons.glyphMap => {
  switch (type) {
    case 'hidratacao':
      return 'water';
    case 'exercicio':
      return 'run';
    case 'mindfulness':
      return 'meditation';
    case 'diario':
      return 'book';
    case 'objetivo':
      return 'target';
    default:
      return 'bell';
  }
};
