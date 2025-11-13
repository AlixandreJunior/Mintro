// components/AppProviders.tsx
import React, { useState, useEffect } from 'react';
import AchievementModal from './AchievementModal';
import { registerAchievementHandler } from '@/share/api';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/share/context/AuthContext';

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
