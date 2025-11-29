import React from 'react';
import { KeyboardType, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

interface MainInputProps {
  labelText: string;
  value: string | number;
  keyboardType?: KeyboardType;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errors?: string[]; // ✅ adicionando suporte a erros
}

export const MainInput: React.FC<MainInputProps> = ({
  labelText,
  value,
  keyboardType,
  onChangeText,
  placeholder,
  errors,
}) => {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{labelText}</Text>
      <TextInput
        mode="outlined"
        value={String(value)}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[
          styles.textInput,
          errors ? { borderColor: '#EF4444' } : null, // ✅ borda vermelha se houver erro
        ]}
        outlineStyle={styles.textInputOutline as ViewStyle}
        placeholder={placeholder ? placeholder : ''}
        theme={{
          fonts: {
            regular: { fontFamily: 'Poppins_400Regular' },
          },
        }}
      />

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
  inputSection: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000ff',
    marginBottom: 2,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  } as ViewStyle,
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
