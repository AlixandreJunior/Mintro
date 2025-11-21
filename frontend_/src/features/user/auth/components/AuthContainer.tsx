import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import MintroLogo from '@/share/components/layout/MintroLogo';

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MintroLogo />
        <View
          style={[
            styles.content,
            {
              paddingHorizontal: width * 0.06,
              paddingBottom: height * 0.05,
            },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F8',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default AuthContainer;
