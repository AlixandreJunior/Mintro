import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { DiaryService } from '../DiaryService';
import { Diary, DiaryWrite } from '@/share/types/mental/diary';
import { ResponseSuccess } from '@/share/types/response';
import { objectToFormData } from '@/share/utils/formData';

export const useDiary = () => {
  const { handleRequest, error, loading } = useHandleRequest();

  const handleDiaryList = async (date: Date): Promise<Diary[]> => {
    return await handleRequest(() => DiaryService.list(date));
  };

  const handleDiaryRetrieve = async (id: number): Promise<Diary> => {
    return await handleRequest(() => DiaryService.retrieve(id));
  };

  const handleDiaryCreate = async (
    data: DiaryWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => DiaryService.create(data));
  };

  const handleDiaryUpdate = async (
    id: number,
    data: Partial<DiaryWrite>
  ): Promise<ResponseSuccess> => {
    const formData = objectToFormData(data);
    return await handleRequest(() => DiaryService.update(id, formData));
  };

  const handleDiaryDelete = async (id: number): Promise<ResponseSuccess> => {
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
