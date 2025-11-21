// index.tsx
import React, { useMemo } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFabAnimation } from '../hooks/useFabAnimation';
import { FabItem } from './DiaryFabItem';

interface FloatingActionButtonProps {
  onPressCreateDiary: () => void;
  onPressCreateObjective: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPressCreateDiary,
  onPressCreateObjective,
}) => {
  const { isOpen, toggle, rotateIcon, getItemAnimation } = useFabAnimation();
  const styles = useMemo(() => createStyles(), []);

  const fabItems = [
    {
      label: 'Objetivo',
      icon: 'target',
      translation: { x: 0, y: -80 },
      onPress: onPressCreateObjective,
    },
    {
      label: 'Diário',
      icon: 'book-open-outline',
      translation: { x: -80, y: 0 },
      onPress: onPressCreateDiary,
    },
  ];

  return (
    <View style={styles.container}>
      {fabItems.map((item, index) => (
        <FabItem
          key={index}
          icon={item.icon}
          label={item.label}
          isOpen={isOpen}
          styles={styles}
          animatedStyle={getItemAnimation(
            item.translation.x,
            item.translation.y
          )}
          onPress={() => {
            toggle();
            item.onPress();
          }}
        />
      ))}

      <TouchableOpacity
        style={styles.mainFab}
        onPress={toggle}
        accessibilityLabel="Menu flutuante"
      >
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export const createStyles = () =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainFab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      zIndex: 10,
    },
    subFabWrapper: {
      position: 'absolute',
      alignItems: 'center',
    },
    subFabButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#66BB6A',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    label: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: '500',
      color: '#444',
    },
  });

export default FloatingActionButton;
