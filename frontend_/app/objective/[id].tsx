import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import Header from '@/components/Layout/Header';
import HeaderWithOptions from '@/components/Layout/HeaderWithOptions';
import ObjectiveProgressCard from '@/components/ObjectiveProgressCard';
import ObjectiveStreakSection from '@/components/ObjectiveStreakSection';
import ObjectiveRateSection from '@/components/ObjectiveRateSection';
import ObjectiveConclusionSection from '@/components/ObjectiveConclusionSection';
import ObjectiveCalendarSection from '@/components/ObjectiveCalendarSection';
import ObjectiveDisplayCard from '@/components/Cards/ObjectiveCard';
import { useObjective } from '@/hooks/useObjective';
import { Objective } from '@/types/mental/objectives';

import { useObjectiveForm } from '@/hooks/forms/useObjectiveForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import ObjectiveFooter from '@/components/ObjectiveFooter';

const { height } = Dimensions.get('window');

export default function ObjectiveDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const { handleDelete, handleGetObjective } = useObjective();

  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [isReminderModalVisible, setReminderModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const {
    selectedRepeat,
    setSelectedRepeat,
    reminderTime,
    setReminderTime,
    setRemindersEnabled,
    handleUpdate,
  } = useObjectiveForm();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    reminderTime ? parseTimeStringToDate(reminderTime) : new Date()
  );

  // Converte "HH:mm" para Date no mesmo dia
  function parseTimeStringToDate(time: string): Date {
    const [hour, minute] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  useEffect(() => {
    const fetchObjective = async () => {
      try {
        const data = await handleGetObjective(Number(id));
        setObjective(data);
        // Ajusta estados iniciais do form conforme dados do objetivo
        setSelectedRepeat(data.repeat);
        if (data.reminder) {
          setReminderTime(data.reminder);
          setRemindersEnabled(true);
          setSelectedDate(parseTimeStringToDate(data.reminder));
        }
      } catch (error) {
        console.error('Erro ao buscar objetivo:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchObjective();
  }, [id, setSelectedRepeat, setReminderTime, setRemindersEnabled]);

  const onRepeatSelect = async (times: number) => {
    if (!objective) return;

    const repeatStr = times === 1 ? '1x' : times === 3 ? '3x' : '5x';
    setSelectedRepeat(repeatStr);
    setUpdating(true);

    try {
      await handleUpdate(Number(id));
      // Atualiza period para string que seu backend espera, ex: "1w", "3w", "5w"
      setObjective((prev) =>
        prev ? { ...prev, period: `${times}w`, repeat: repeatStr } : prev
      );
      setRepeatModalVisible(false);
    } catch (error: any) {
      console.error('Erro ao atualizar objetivo:', error.message || error);
    } finally {
      setUpdating(false);
    }
  };

  const onReminderSave = async () => {
    setUpdating(true);
    try {
      const timeString = selectedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setReminderTime(timeString);
      setRemindersEnabled(true);
      await handleUpdate(Number(id));
      setObjective((prev) => (prev ? { ...prev, reminder: timeString } : prev));
      setReminderModalVisible(false);
    } catch (error: any) {
      console.error('Erro ao salvar lembrete:', error.message);
    } finally {
      setUpdating(false);
    }
  };

  const onTimeChange = (_event: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (selected) setSelectedDate(selected);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 32 }}
        />
      </SafeAreaView>
    );
  }

  if (!objective) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>
          Objetivo não encontrado.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar="A" />
      <HeaderWithOptions
        title="Detalhes de Objetivo"
        options={[
          { label: 'Repetir', onPress: () => setRepeatModalVisible(true) },
          { label: 'Lembretes', onPress: () => setReminderModalVisible(true) },
          { label: 'Excluir', onPress: () => handleDelete(Number(id)) },
        ]}
        onBackPress={() => router.replace('/(tabs)/mental')}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ObjectiveDisplayCard
          objectiveTitle={objective.activity.name}
          objectiveSubtitle={
            new Date(objective.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }) || 'Sem descrição'
          }
        />
        <ObjectiveProgressCard
          current={objective.week_count}
          total={parseInt(objective.repeat)} // converter "1x" -> 1
        />
        <ObjectiveStreakSection
          current={objective.streak}
          longest={objective.best_streak}
        />
        <ObjectiveCalendarSection diary_dates={objective.diary_dates} />
        <ObjectiveRateSection
          repeat={parseInt(objective.repeat)}
          week_count={objective.week_count}
          success_rate_avarege={objective.success_rate_average}
        />
        <ObjectiveConclusionSection
          thisMonth={objective.conclusion_count}
          total={objective.conclusion_count}
        />

        <ObjectiveFooter createdAt={objective.created_at} />
      </ScrollView>

      {/* Modal de repetição */}
      <Modal visible={isRepeatModalVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => !updating && setRepeatModalVisible(false)}
          disabled={updating}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Repetir objetivo</Text>
            {[1, 3, 5].map((times) => (
              <Pressable
                key={times}
                style={styles.optionButton}
                onPress={() => onRepeatSelect(times)}
                disabled={updating}
              >
                <Text style={styles.optionText}>{times} vez(es)</Text>
              </Pressable>
            ))}
            {updating && (
              <ActivityIndicator
                size="small"
                color="#000"
                style={{ marginTop: 15 }}
              />
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Modal de lembrete */}
      <Modal visible={isReminderModalVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => !updating && setReminderModalVisible(false)}
          disabled={updating}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o horário do lembrete</Text>

            <Pressable
              style={[styles.optionButton, { backgroundColor: '#DDEFFF' }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.optionText}>
                {selectedDate.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Pressable>

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={selectedDate}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onTimeChange}
                is24Hour
              />
            )}

            <Pressable
              style={[styles.optionButton, { backgroundColor: '#A6E1AF' }]}
              onPress={onReminderSave}
              disabled={updating}
            >
              <Text style={styles.optionText}>Salvar Lembrete</Text>
            </Pressable>

            {updating && (
              <ActivityIndicator
                size="small"
                color="#000"
                style={{ marginTop: 10 }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.02,
  },
  startDateContainer: {
    alignItems: 'center',
    width: 140,
    alignSelf: 'center',
  },
  startDateLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 2,
  },
  startDateValue: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#000',
  },
});
