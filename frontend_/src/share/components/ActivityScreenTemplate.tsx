import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import HeaderWithOptions from './layout/HeaderWithOptions';
import { FloatingActionButton } from './FloatingButtonAction';
import ActivityMainContent from './ActivityTemplateMainContent';

interface Props {
  title: string;
  type: 'exercise' | 'mindfulness';
  onAddPress: () => void;
}

function ActivityScreenTemplate({ title, type, onAddPress }: Props) {
  const handleBack = useCallback(() => {
    router.replace('/(app)/(tabs)/activity');
  }, []);

  const handleAddPress = useCallback(() => {
    onAddPress();
  }, [onAddPress]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <HeaderWithOptions title={title} onBackPress={handleBack} />

      <ActivityMainContent type={type} />

      <FloatingActionButton onPress={handleAddPress} />
    </SafeAreaView>
  );
}

export default React.memo(ActivityScreenTemplate);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
