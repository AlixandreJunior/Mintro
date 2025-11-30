import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProgressCircle } from '../../../../share/components/icons/ProgressCircle';
import WaterDropIcon from '../../../../share/components/icons/WaterDropIcon';
import { router } from 'expo-router';
import { Hydration } from '@/share/types/health/hydratation';
import { useEffect, useState } from 'react';
import { useHydration } from '../hooks/useHydration';
import { useToast } from '@/share/providers/ToastProvider';

interface HydratationCardProps {
  logs: Hydration[];
}

const { width, height } = Dimensions.get('window');

export const HydratationCard: React.FC<HydratationCardProps> = ({ logs }) => {
  const { showToast } = useToast();
  const [goal, setHydrationGoal] = useState<number | null>(null);

  const { handleHydrationGoal } = useHydration();
  useEffect(() => {
    const loadGoal = async () => {
      try {
        const data = await handleHydrationGoal();
        if (data?.goal) {
          setHydrationGoal(data.goal);
        }
      } catch (error) {
        console.log('Erro ao carregar meta de hidratação', error);
        showToast('Erro ao carregar meta de hidratação', 'error');
      }
    };

    loadGoal();
  }, []);

  const totalHydrationToday = logs.reduce(
    (sum, { quantity = 0 }) => sum + quantity,
    0
  );

  const progress = goal ? Math.min(1, totalHydrationToday / goal) : 0;

  return (
    <TouchableOpacity
      style={styles.cardTouchable}
      onPress={() => router.push('../hydratation/')}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Hidratação</Text>
            <Text style={styles.cardValue}>{totalHydrationToday} ml</Text>
            <Text style={styles.cardSubtitle}>Hoje</Text>
          </View>
          <View style={styles.hydrationProgress}>
            <ProgressCircle
              progress={progress}
              size={80}
              color="#415af7ff"
              strokeWidth={6}
            />
            <View style={styles.hydrationIcon}>
              <WaterDropIcon size={18} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardTouchable: {
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  hydrationProgress: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hydrationIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
