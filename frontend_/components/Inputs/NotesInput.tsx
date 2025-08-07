import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

interface NotesInputProps {
  notes: string;
  onChangeNotes: (text: string) => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ notes, onChangeNotes }) => {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>Anotação</Text>
      <TextInput
        mode="outlined"
        placeholder="Escreva suas anotações aqui..."
        value={notes}
        onChangeText={onChangeNotes}
        multiline
        numberOfLines={4}
        style={[styles.textInput, styles.notesInput]}
        outlineStyle={styles.textInputOutline as ViewStyle}
        theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {},
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textInputOutline: {
    borderRadius: 8,
    borderColor: '#E5E7EB',
  } as ViewStyle,
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default NotesInput;
