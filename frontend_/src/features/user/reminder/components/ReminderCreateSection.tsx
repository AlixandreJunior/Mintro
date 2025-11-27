import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import ReminderModalForm from './ReminderModalForm';

export type NotificationType =
  | 'diario'
  | 'hidratacao'
  | 'exercicio'
  | 'mindfulness'
  | 'outro';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    content: string;
    date: string;
    time: string;
    is_daily: boolean;
    type: string;
    deadline?: string | null;
  }) => void;
  notification?: any;
}

const TYPE_MAP: Record<NotificationType, string> = {
  diario: 'DR',
  hidratacao: 'HD',
  exercicio: 'EX',
  mindfulness: 'MD',
  outro: 'OT',
};

const CreateNotificationModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  notification,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDaily, setIsDaily] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [type, setType] = useState<NotificationType>('hidratacao');

  useEffect(() => {
    if (!visible) return;

    if (notification) {
      setTitle(notification.title);
      setContent(notification.content);
      setDate(new Date(notification.date));
      setTime(
        notification.time
          ? new Date('1970-01-01T' + notification.time)
          : new Date()
      );
      setIsDaily(notification.is_daily);

      const found = Object.entries(TYPE_MAP).find(
        ([, v]) => v === notification.type
      );
      setType(found ? (found[0] as NotificationType) : 'hidratacao');
    } else {
      setTitle('');
      setContent('');
      setDate(new Date());
      setTime(new Date());
      setIsDaily(false);
      setType('hidratacao');
    }

    setShowDatePicker(false);
    setShowTimePicker(false);
  }, [visible, notification]);

  const handleSave = () => {
    const payload = {
      title: title.trim(),
      content: content.trim(),
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0],
      is_daily: isDaily,
      type: TYPE_MAP[type],
    };

    onSave(payload);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <ReminderModalForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          date={date}
          setDate={setDate}
          isDaily={isDaily}
          setIsDaily={setIsDaily}
          time={time}
          setTime={setTime}
          type={type}
          setType={setType}
          showTimePicker={showTimePicker}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          setShowTimePicker={setShowTimePicker}
          onClose={onClose}
          onSave={handleSave}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default CreateNotificationModal;
