import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ReminderService } from '../ReminderService';
import { ResponseSuccess } from '@/share/types/response';

export function useReminder() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleReminderList = async (): Promise<any> => {
    return await handleRequest(() => ReminderService.list());
  };

  const handleReminderRetrieve = async (id: number): Promise<any> => {
    return await handleRequest(() => ReminderService.retrieve(id));
  };

  const handleReminderCreate = async (data: any): Promise<ResponseSuccess> => {
    return await handleRequest(() => ReminderService.create(data));
  };

  const handleReminderUpdate = async (
    id: number,
    data: any
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ReminderService.update(id, data));
  };

  const handleReminderDelete = async (id: number): Promise<ResponseSuccess> => {
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
