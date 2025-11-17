import { StyleSheet, Text } from 'react-native';

const DiaryErrorState = ({ message }: { message: string }) => (
  <Text style={styles.errorText}>Erro ao carregar diários: {message}</Text>
);

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiaryErrorState;
