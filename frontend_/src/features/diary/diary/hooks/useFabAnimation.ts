// useFabAnimation.ts
import { useState, useMemo } from 'react';
import { Animated } from 'react-native';

export function useFabAnimation() {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useMemo(() => new Animated.Value(0), []);

  const toggle = () => {
    Animated.spring(animation, {
      toValue: isOpen ? 0 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen((prev) => !prev);
  };

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const getItemAnimation = (x: number, y: number) => ({
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        }),
      },
    ],
    opacity: animation,
  });

  return {
    isOpen,
    toggle,
    rotateIcon,
    getItemAnimation,
  };
}
