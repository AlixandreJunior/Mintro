import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

interface StatsLoadingProps {
  loadingUser: boolean;
}

const { width, height } = Dimensions.get('window');

export const StatsLoading: React.FC<StatsLoadingProps> = ({ loadingUser }) => {
  return (
    <>
      {loadingUser && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
});
