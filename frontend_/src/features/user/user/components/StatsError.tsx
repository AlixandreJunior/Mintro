import { Dimensions, StyleSheet, Text } from 'react-native';

interface StatsErrorProps {
  errorUser: string | null;
}

const { width, height } = Dimensions.get('window');

export const StatsError: React.FC<StatsErrorProps> = ({ errorUser }) => {
  return (
    <>
      {errorUser && (
        <Text style={styles.errorText}>
          Erro ao carregar estatísticas: {errorUser}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: width * 0.02,
    marginTop: height * 0.02,
    fontFamily: 'Poppins_400Regular',
  },
});
