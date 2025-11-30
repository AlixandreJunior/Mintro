import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface LogoutButtonProps {
  onLogout: () => void; 
}


export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onLogout
}) => {
  return (
    <TouchableOpacity style={styles.editProfileButton} onPress={onLogout}>
        <Text style={styles.editProfileText}>Sair da Conta</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins_400Regular',
    color: '#ff1f1fff',
  },
});
