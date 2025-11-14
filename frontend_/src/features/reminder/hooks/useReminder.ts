import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ReminderService } from '../ReminderService';

export function useReminder() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleReminderList = async () => {
    return await handleRequest(() => ReminderService.list());
  };

  const handleReminderRetrieve = async (id: number) => {
    return await handleRequest(() => ReminderService.retrieve(id));
  };

  const handleReminderCreate = async (data: any) => {
    return await handleRequest(() => ReminderService.create(data));
  };

  const handleReminderUpdate = async (id: number, data: any) => {
    return await handleRequest(() => ReminderService.update(id, data));
  };

  const handleReminderDelete = async (id: number) => {
    return await handleRequest(() => ReminderService.delete(id));
  };

  return {
    loading,
    error,
    handleReminderCreate,
    handleReminderDelete,
    handleReminderUpdate,
    handleReminderRetrieve,
    handleReminderList,
  };
}
