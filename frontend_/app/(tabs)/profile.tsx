import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

import Header from '@/components/Layout/Header';
import { UserInfoSection } from '@/components/UserInfoSection';
import { StatsSection } from '@/components/StatsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import AchievementIconBase from '@/components/Icons/AchievementIcon';
import AchievementsCarousel from '@/components/AchievementsCarousel';

const { width, height } = Dimensions.get('window');
const screenContentPaddingHorizontal = width * 0.05;

interface Achievement {
  id: string;
  iconName: string;
  label: string;
  starsAchieved: number;
  totalStars: number;
  isUnlocked: boolean;
  primaryColor?: string;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', iconName: 'leaf', label: 'Bem-vindo ao Mintro', starsAchieved: 3, totalStars: 3, isUnlocked: true, primaryColor: '#79D457' }, // Verde mais claro
  { id: '4', iconName: 'dumbbell', label: 'Foco Total', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '5', iconName: 'water', label: 'Gota a Gole', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '7', iconName: 'meditation', label: 'Zen Total', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
  { id: '8', iconName: 'book-open-page-variant', label: 'Narrador da própria história', starsAchieved: 0, totalStars: 3, isUnlocked: false, primaryColor: '#A0A0A0' },
];

export default function ProfileScreen() {
  const { user, goals, loadingUser, loadingGoals, errorUser, errorGoals } = useUserProfile();
  const displayName = user?.username || 'Carregando...';
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : 'N/A';
  const avatarChar = user?.username ? user.username.charAt(0).toUpperCase() : 'A';

  const itemWidth = width * 0.4;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar={avatarChar} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection avatarChar={avatarChar} displayName={displayName} joinYear={joinYear} />
        <StatsSection fetchedUser={user} loadingUser={loadingUser} errorUser={errorUser} />
        <AchievementsCarousel achievements={MOCK_ACHIEVEMENTS}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: screenContentPaddingHorizontal,
    backgroundColor: '#fff',
  },
  achievementsSectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: height * 0.02,
    paddingVertical: height * 0.02,
    paddingHorizontal: screenContentPaddingHorizontal,
    elevation: 2,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  achievementsTitle: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
  },
  showAllButton: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins_400Regular',
    color: '#007AFF',
  },
  achievementItemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  achievementIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  achievementCenterIcon: {
    position: 'absolute',
  },
  achievementLabelText: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    lineHeight: width * 0.035,
    textAlign: 'center',
    color: '#000000',
    width: '100%',
    minHeight: width * 0.07,
  },
});
