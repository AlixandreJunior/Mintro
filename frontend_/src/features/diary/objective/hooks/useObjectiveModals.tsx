import { useCallback, useState } from 'react';

type ModalType = 'repeat' | 'reminder' | null;

export const useObjectiveModals = () => {
  const [modalVisible, setModalVisible] = useState<ModalType>(null);
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [selectedRepeat, setSelectedRepeat] = useState<string | null>(null);

  const handleModalChange = useCallback(
    (type: ModalType, value: string | null) => {
      type === 'reminder' ? setReminderTime(value) : setSelectedRepeat(value);
    },
    []
  );

  const closeModals = () => setModalVisible(null);

  return {
    modalVisible,
    setModalVisible,
    reminderTime,
    selectedRepeat,
    handleModalChange,
    closeModals,
  };
};
