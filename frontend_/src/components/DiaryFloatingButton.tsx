import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onPressCreateDiary: () => void;
  onPressCreateObjective: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPressCreateDiary,
  onPressCreateObjective,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const handleToggle = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const fabItems = [
    {
      label: 'Objetivo',
      icon: 'target',
      onPress: onPressCreateObjective,
      animatedStyle: {
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -80],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    },
    {
      label: 'Diário',
      icon: 'book-open-outline',
      onPress: onPressCreateDiary,
      animatedStyle: {
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -80],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    },
  ];

  return (
    <View style={styles.container}>
      {fabItems.map((item, index) => (
        <Animated.View
          key={index}
          style={[styles.subFabWrapper, item.animatedStyle]}
          pointerEvents={isOpen ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={styles.subFabButton}
            onPress={() => {
              item.onPress();
              handleToggle(); // Fecha ao clicar
            }}
            accessibilityLabel={`Adicionar ${item.label}`}
          >
            {/*@ts-ignore*/}
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.label}>{item.label}</Text>
        </Animated.View>
      ))}

      <TouchableOpacity
        style={styles.mainFab}
        onPress={handleToggle}
        accessibilityLabel="Botão de ação flutuante"
      >
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#444',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default FloatingActionButton;
