import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 390;
const verticalScale = height / 844;

interface MainButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  errors?: string[];
  flex?: number; // 🔹 proporção flexível
  style?: ViewStyle; // 🔹 estilo customizado extra
}

export const MainButton: React.FC<MainButtonProps> = ({
  label,
  onPress,
  color = '#3B82F6',
  disabled = false,
  errors,
  flex = 1,
  style,
}) => {
  return (
    <View style={[styles.container, { flex }, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: disabled ? '#9CA3AF' : color },
          pressed && !disabled ? styles.pressed : null,
          errors && styles.buttonError,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>

      {errors &&
        errors.map((errMsg, index) => (
          <Text key={index} style={styles.errorText}>
            {errMsg}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12 * verticalScale,
  },

  button: {
    paddingVertical: 14 * verticalScale,
    paddingHorizontal: 16 * scale,
    borderRadius: 12 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6 * scale,
    shadowOffset: { width: 0, height: 3 * verticalScale },
    elevation: 4,
  },

  pressed: {
    opacity: 0.85,
  },

  label: {
    color: 'white',
    fontSize: 16 * scale,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },

  buttonError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12 * scale,
    marginTop: 4 * verticalScale,
    fontFamily: 'Poppins_400Regular',
  },
});
