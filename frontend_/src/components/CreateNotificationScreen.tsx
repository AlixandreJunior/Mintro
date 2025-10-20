// components/CreateNotificationScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { NotificationRecord, NotificationType } from '@/hooks/useNotifications';
import { Picker } from '@react-native-picker/picker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    body: string,
    hour: number,
    minute: number,
    daily: boolean,
    type: NotificationType
  ) => void;
  notification?: NotificationRecord;
}

const NOTIFICATION_TYPES: { value: NotificationType; label: string }[] = [
  { value: 'diario', label: 'Diário' },
  { value: 'objetivo', label: 'Objetivo' },
  { value: 'hidratacao', label: 'Hidratação' },
  { value: 'exercicio', label: 'Exercício' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'outro', label: 'Outro' },
];

const CreateNotificationModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  notification,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [time, setTime] = useState(new Date());
  const [daily, setDaily] = useState(true);
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [type, setType] = useState<NotificationType>('hidratacao');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    if (!visible) return;

    // Resetar estados quando o modal abrir
    setErrors({});

    if (notification) {
      setTitle(notification.title);
      setBody(notification.body);
      setTime(new Date(notification.date));
      setDaily(notification.isDaily);
      setType(notification.type);
    } else {
      setTitle('');
      setBody('');
      setTime(new Date());
      setDaily(true);
      setType('hidratacao');
    }

    setShowPicker(Platform.OS === 'ios');
  }, [visible, notification]);

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'set' && selectedTime) setTime(selectedTime);
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; body?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!body.trim()) {
      newErrors.body = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    onSave(
      title.trim(),
      body.trim(),
      time.getHours(),
      time.getMinutes(),
      daily,
      type
    );
  };

  const openPicker = () => setShowPicker(true);

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            margin: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            {notification ? 'Editar Notificação' : 'Nova Notificação'}
          </Text>

          {/* Título */}
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Título *</Text>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            placeholder="Digite o título da notificação"
            style={{
              borderWidth: 1,
              borderColor: errors.title ? 'red' : '#ccc',
              borderRadius: 6,
              marginBottom: 4,
              paddingHorizontal: 8,
              height: 40,
            }}
          />
          {errors.title && (
            <Text style={{ color: 'red', fontSize: 12, marginBottom: 8 }}>
              {errors.title}
            </Text>
          )}

          {/* Mensagem */}
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
            Mensagem *
          </Text>
          <TextInput
            value={body}
            onChangeText={(text) => {
              setBody(text);
              if (errors.body) setErrors({ ...errors, body: undefined });
            }}
            placeholder="Digite a mensagem da notificação"
            style={{
              borderWidth: 1,
              borderColor: errors.body ? 'red' : '#ccc',
              borderRadius: 6,
              marginBottom: 4,
              paddingHorizontal: 8,
              height: 40,
            }}
          />
          {errors.body && (
            <Text style={{ color: 'red', fontSize: 12, marginBottom: 8 }}>
              {errors.body}
            </Text>
          )}

          {/* Horário */}
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Horário</Text>
          {Platform.OS === 'android' && !showPicker && (
            <Button
              title={`Selecionar horário: ${time
                .getHours()
                .toString()
                .padStart(2, '0')}:${time
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
              onPress={openPicker}
            />
          )}
          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              style={{ marginBottom: 20 }}
            />
          )}

          {/* Diário */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ marginRight: 8 }}>Notificação Diária</Text>
            <Switch value={daily} onValueChange={setDaily} />
          </View>

          {/* Tipo de Notificação */}
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Tipo</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) =>
              setType(itemValue as NotificationType)
            }
            style={{ marginBottom: 20 }}
          >
            {NOTIFICATION_TYPES.map((t) => (
              <Picker.Item key={t.value} label={t.label} value={t.value} />
            ))}
          </Picker>

          {/* Botões */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button title="Cancelar" onPress={handleClose} color="#888" />
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateNotificationModal;
