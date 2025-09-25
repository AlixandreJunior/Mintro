import { StyleSheet, SafeAreaView } from 'react-native';
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
  const handleBack = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithOptions
        title={title}
        onBackPress={handleBack}
        options={[
          { label: 'Lembrete', onPress: () => console.log('Lembrete') },
        ]}
      />

      <ActivityMainContent type={type} />

      <FloatingActionButton onPress={onAddPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
});

export default ActivityScreenTemplate;
