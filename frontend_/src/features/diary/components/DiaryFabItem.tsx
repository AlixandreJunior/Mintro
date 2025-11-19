// FabItem.tsx
import React from 'react';
import { Animated, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FabItemProps {
  icon: string;
  label: string;
  animatedStyle: any;
  onPress: () => void;
  styles: any;
  isOpen: boolean;
}

export const FabItem: React.FC<FabItemProps> = ({
  icon,
  label,
  animatedStyle,
  onPress,
  styles,
  isOpen,
}) => (
  <Animated.View
    style={[styles.subFabWrapper, animatedStyle]}
    pointerEvents={isOpen ? 'auto' : 'none'}
  >
    <TouchableOpacity
      style={styles.subFabButton}
      onPress={onPress}
      accessibilityLabel={`Criar ${label}`}
    >
      <MaterialCommunityIcons name={icon as any} size={24} color="#fff" />
    </TouchableOpacity>

    <Text style={styles.label}>{label}</Text>
  </Animated.View>
);
