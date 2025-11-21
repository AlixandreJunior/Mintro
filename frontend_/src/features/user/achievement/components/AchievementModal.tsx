// components/AchievementModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

export default function AchievementModal({
  visible,
  onClose,
  achievements,
}: {
  visible: boolean;
  onClose: () => void;
  achievements: string[];
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>🏆 Conquista desbloqueada!</Text>
          {achievements.map((a, idx) => (
            <Text key={idx} style={styles.achievement}>
              {a}
            </Text>
          ))}
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  achievement: { fontSize: 16, marginVertical: 4 },
  button: {
    marginTop: 20,
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
