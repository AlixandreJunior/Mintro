import { Dimensions, StyleSheet, View } from 'react-native';
import StatCard from './StatCard';
import ExerciseIcon from '../../../share/components/icons/ExerciseIcon';
import MeditationIcon from '../../../share/components/icons/MeditationIcon';
import NotebookIcon from '../../../share/components/icons/NotebookIcon';
import { User } from '@/share/types/user/user';

interface StatsCardSectionProps {
  fetchedUser: User | null;
}

const { width, height } = Dimensions.get('window');

const cardGap = 10;
const screenContentPaddingHorizontal = 20;
const threeColumnCardWidth =
  (width - screenContentPaddingHorizontal * 2 - cardGap * (3 - 1)) / 3;

export const StatsCardSection: React.FC<StatsCardSectionProps> = ({
  fetchedUser,
}) => {
  const statistics = fetchedUser
    ? [
        {
          icon: <NotebookIcon size={14} />,
          value: fetchedUser.diarys_registers,
          label: 'Diários registrados',
        },
        {
          icon: <MeditationIcon size={18} />,
          value: fetchedUser.mindfulness_registers,
          label: 'Sessões de Mindfulness',
        },
        {
          icon: <ExerciseIcon size={25} />,
          value: fetchedUser.exercises_registers,
          label: 'Exercícios físicos',
        },
      ]
    : [];

  return (
    <View style={styles.metricCardGrid}>
      {statistics.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          cardWidth={threeColumnCardWidth}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  metricCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: cardGap,
  },
});
