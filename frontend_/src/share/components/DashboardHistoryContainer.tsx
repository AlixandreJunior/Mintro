import { View, Text, StyleSheet } from 'react-native';

interface DashboardHistoryContainerProps<T extends Record<string, any>> {
  children: React.ReactNode;
}

export function DashboardHistoryContainer<T extends Record<string, any>>({
  children,
}: DashboardHistoryContainerProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 100, marginTop: 10 },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000ff',
    marginBottom: 8,
  },
});
