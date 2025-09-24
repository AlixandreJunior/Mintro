import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';


const { width} = Dimensions.get('window');

interface ProfileAvatarProps {
  avatarChar: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarChar,
}) => {
  return (
    <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{avatarChar}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarPlaceholder: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: (width * 0.17) / 2,
    backgroundColor: '#79D457',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
});
