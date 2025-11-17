import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { AchievementsHeader } from './AchievementsHeader';
import AchievementCarousel from './AchievementCarousel';

const { width, height } = Dimensions.get('window');

const AchievementSection = () => {
  return (
    <View style={styles.container}>
      <AchievementsHeader />
      <AchievementCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: height * 0.01,
  },
});

export default AchievementSection;
