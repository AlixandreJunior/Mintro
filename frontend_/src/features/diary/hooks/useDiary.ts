import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { DiaryService } from '../DiaryService';
import { Diary } from '@/share/types/mental/diary';

export const useDiary = () => {
  const { handleRequest, error, loading } = useHandleRequest();

  const handleDiaryList = async (): Promise<Diary[]> => {
    return await handleRequest(() => DiaryService.list());
  };

  const handleDiaryRetrieve = async (id: number): Promise<Diary> => {
    return await handleRequest(() => DiaryService.retrieve(id));
  };

  const handleDiaryCreate = async (data: any): Promise<any> => {
    return await handleRequest(() => DiaryService.create(data));
  };

  const handleDiaryUpdate = async (id: number, data: any): Promise<any> => {
    return await handleRequest(() => DiaryService.update(id, data));
  };

  const handleDiaryDelete = async (id: number): Promise<any> => {
    return await handleRequest(() => DiaryService.delete(id));
  };

  return {
    error,
    loading,
    handleDiaryList,
    handleDiaryRetrieve,
    handleDiaryCreate,
    handleDiaryUpdate,
    handleDiaryDelete,
  };
};
