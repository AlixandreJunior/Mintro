import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export const StatsHeader = () => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Estatísticas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_400Regular',
    color: '#2C3E50',
    marginBottom: height * 0.005,
  },
});
