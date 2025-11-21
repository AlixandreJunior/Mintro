import { StyleSheet, Text } from 'react-native';

const DiaryEmptyState = () => (
  <Text style={styles.noDataText}>Nenhum diário encontrado para este mês.</Text>
);

const styles = StyleSheet.create({
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default DiaryEmptyState;
