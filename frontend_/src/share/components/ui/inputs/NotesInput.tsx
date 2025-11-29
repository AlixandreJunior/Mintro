import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

interface NotesInputProps {
  notes: string;
  onChangeNotes: (text: string) => void;
  errors?: string[];
  placeholder?: string;
}

const NotesInput: React.FC<NotesInputProps> = ({
  notes,
  onChangeNotes,
  errors,
  placeholder = 'Escreva suas anotações aqui...',
}) => {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.label}>Anotação</Text>
      <TextInput
        mode="outlined"
        value={notes}
        onChangeText={onChangeNotes}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        multiline
        numberOfLines={4}
        style={[
          styles.input,
          styles.notesInput,
          errors && errors.length > 0 ? { borderColor: '#EF4444' } : null,
        ]}
        outlineStyle={styles.inputOutline as ViewStyle}
        theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }}
      />

      {errors &&
        errors.map((errMsg, idx) => (
          <Text key={idx} style={styles.errorText}>
            {errMsg}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1F2937',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputOutline: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  } as ViewStyle,
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default NotesInput;
