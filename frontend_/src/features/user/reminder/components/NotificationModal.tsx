import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: any[];
  onDelete: (id: string) => void;
  onEdit: (item: any) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
  notifications,
  onDelete,
  onEdit,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Notificações Configuradas</Text>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item.identifier}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.content.title}</Text>
                  <Text style={styles.itemBody}>{item.content.body}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#4A90E2' }]}
                  onPress={() => onEdit(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#E74C3C' }]}
                  onPress={() => onDelete(item.identifier)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>Nenhuma notificação configurada.</Text>
            }
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  itemTitle: { fontSize: 16, fontWeight: '500' },
  itemBody: { fontSize: 14, color: '#555' },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: { color: '#fff', fontSize: 13 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeText: { color: '#fff', fontWeight: '600' },
});

export default NotificationModal;
