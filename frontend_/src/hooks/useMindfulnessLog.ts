import { useState, useEffect } from 'react';
import {
  MindfulnessLog,
  MindfulnessLogWrite,
} from '@/types/health/mindfulness';
import { getMindfulnessLogs } from '@/services/mindfulness/listMindfulnessLog';
import { getMindfulnessList } from '@/services/mindfulness/listMindfulness';
import { registerMindfulnessLog } from '@/services/mindfulness/registerMindfulnessLog';

type Period = 'week' | 'month';

interface Mindfulness {
  id: number;
  name: string;
}

export function useMindfulnessLogs(date: Date, period?: Period) {
  const [logs, setLogs] = useState<MindfulnessLog[]>([]);
  const [mindfulnessList, setMindfulnessList] = useState<Mindfulness[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const logsData = await getMindfulnessLogs(date, period);
        setLogs(logsData);

        const listData = await getMindfulnessList();
        setMindfulnessList(listData);
      } catch (err) {
        console.error('Erro mindfulness:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, period]);

  const handleSaveMindfulness = async (data: MindfulnessLogWrite) => {
    if (!data.mindfulness || !data.datetime || data.duration <= 0) {
      throw new Error('Preencha todos os campos corretamente.');
    }

    setSaving(true);
    try {
      const savedLog = await registerMindfulnessLog(data);
      setLogs((prev) => [...prev, savedLog]);
      return savedLog;
    } catch (err) {
      console.error('Erro ao registrar mindfulness:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { logs, mindfulnessList, loading, saving, handleSaveMindfulness };
}
