import { StyleSheet, View, Dimensions } from 'react-native';
import { LogoutButton } from './LogoutButton';
import { User } from '@/share/types/user/user';
import { ProfileUserInfoSection } from './ProfileUserInfoSection';
import { ProfileCard } from './ProfileCard';

const { height } = Dimensions.get('window');

interface UserInfoSectionProps {
  user: User | null;
  onLogout: () => void;
}

export const UserInfoSection: React.FC<UserInfoSectionProps> = ({
  user,
  onLogout,
}) => {
  const displayName = user?.username || 'Carregando...';
  const joinYear = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : 'N/A';
  const avatarChar = user?.username
    ? user.username.charAt(0).toUpperCase()
    : 'A';

  return (
    <View style={styles.cardContainer}>
      <ProfileCard>
        <ProfileUserInfoSection
          avatarChar={avatarChar}
          displayName={displayName}
          joinYear={joinYear}
        />
        <LogoutButton onLogout={onLogout} />
      </ProfileCard>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
});
