import React from 'react';
import { Pressable, Text, StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Escalas suaves proporcionais ao tamanho da tela
const scale = width / 390; // base 390px (iPhone 12/13/14)
const verticalScale = height / 844;

interface MainButtonProps {
  label: string;
  onPress: () => void;
  color?: string; // 🔥 Agora pode mudar a cor do botão
  disabled?: boolean;
  errors?: string[];
}

export const MainButton: React.FC<MainButtonProps> = ({
  label,
  onPress,
  color = '#3B82F6', // 🔥 Cor padrão
  disabled = false,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: disabled ? '#9CA3AF' : color }, // 🔥 aplica cor ou cinza
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
    paddingHorizontal: 12 * scale,

    borderRadius: 10 * scale,

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4 * scale,
    shadowOffset: { width: 0, height: 2 * verticalScale },

    elevation: 3,
  },

  label: {
    color: 'white',
    fontSize: 16 * scale,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Poppins_500Medium',
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
