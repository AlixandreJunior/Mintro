import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { UserInfoSection } from '@/features/user/user/components/UserInfoSection';
import { StatsSection } from '@/features/user/user/components/StatsSection';
import AchievementSection from '../../achievement/components/AchievementsSection';
import { useUser } from '../hooks/useUser';
import { User } from '@/share/types/user/user';
import { useEffect, useState } from 'react';
import { useAuth } from '@/share/context/AuthContext';
import { useToast } from '@/share/providers/ToastProvider'; // 🔹 import do toast provider

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const { handleUserRetrieve, error, loading } = useUser();
  const { logout } = useAuth();
  const { showToast } = useToast(); // 🔹 hook do toast

  useEffect(() => {
    const load = async () => {
      try {
        const data = await handleUserRetrieve();
        setUser(data);
      } catch (e) {
        showToast(
          e instanceof Error ? e.message : 'Erro ao carregar perfil',
          'error'
        );
      }
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection user={user} onLogout={() => logout()} />
        <StatsSection
          fetchedUser={user}
          loadingUser={loading}
          errorUser={error}
        />
        <AchievementSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
