import { useState, useEffect } from 'react';
import { registerAchievementHandler } from '@/share/api';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/share/context/AuthContext';
import AchievementModal from '@/features/user/achievement/components/AchievementModal';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    registerAchievementHandler((newAchievements) => {
      setAchievements(newAchievements);
      setVisible(true);
    });
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>{children}</AuthProvider>
        <AchievementModal
          visible={visible}
          achievements={achievements}
          onClose={() => setVisible(false)}
        />
      </SafeAreaProvider>
    </>
  );
}
