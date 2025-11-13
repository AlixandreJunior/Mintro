import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const AchievementsHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Conquistas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
  },
});
