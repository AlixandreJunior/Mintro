import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { router } from 'expo-router';
import VerticalDotsIcon from '../icons/VerticalDotsIcon';

const { width, height } = Dimensions.get('window');

interface OptionItem {
  label: string;
  onPress: () => void;
}

interface HeaderWithOptionsProps {
  title: string;
  onBackPress?: () => void;
  options?: OptionItem[]; // Array de opções do menu
}

const HeaderWithOptions: React.FC<HeaderWithOptionsProps> = ({
  title,
  onBackPress,
  options = [],
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appbar}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={title} titleStyle={styles.appbarTitle} />

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={() => <VerticalDotsIcon size={width * 0.045} />}
              onPress={openMenu}
            />
          }
        >
          {options.map((option, index) => (
            <Menu.Item
              key={index}
              title={option.label}
              onPress={() => {
                closeMenu();
                option.onPress();
              }}
            />
          ))}
        </Menu>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  appbar: {
    backgroundColor: '#FFFF',
    marginHorizontal: width * 0.01,
    marginVertical: height * 0.002,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 0,
    shadowOpacity: 0,
  },
  appbarTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_400Regular',
  },
});

export default HeaderWithOptions;
