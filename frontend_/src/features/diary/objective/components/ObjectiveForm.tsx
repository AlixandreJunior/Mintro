import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { RepeatSection } from './ObjectiveRepeatSection';
import { ActivitiesSection } from './ObjectiveActivitiesSection';

interface ObjectiveFormProps {
  repeat: '1x' | '3x' | '5x' | null;
  activities: string | null;
  setActivities: React.Dispatch<React.SetStateAction<string | null>>;
  setRepeat: React.Dispatch<React.SetStateAction<'1x' | '3x' | '5x' | null>>;
}

const ObjectiveForm: React.FC<ObjectiveFormProps> = ({
  activities,
  repeat,
  setActivities,
  setRepeat,
}) => {
  const title = 'Escolha um objetivo';

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ActivitiesSection
        title={title}
        selected={activities}
        setSelected={setActivities}
      />
      <RepeatSection selectedRepeat={repeat} setSelectedRepeat={setRepeat} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
});

export default ObjectiveForm;
