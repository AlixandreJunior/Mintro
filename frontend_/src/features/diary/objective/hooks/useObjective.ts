import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ObjectiveService } from '../ObjectiveService';
import { Objective, ObjectiveWrite } from '@/share/types/mental/objectives';
import { ResponseSuccess } from '@/share/types/response';

export function useObjective() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleObjectiveList = async (): Promise<Objective[]> => {
    return await handleRequest(() => ObjectiveService.list());
  };

  const handleObjectiveRetrieve = async (id: number): Promise<Objective> => {
    return await handleRequest(() => ObjectiveService.retrieve(id));
  };

  const handleObjectiveCreate = async (
    data: ObjectiveWrite
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ObjectiveService.create(data));
  };

  const handleObjectiveUpdate = async (
    id: number,
    data: Partial<ObjectiveWrite>
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ObjectiveService.update(id, data));
  };

  const handleObjectiveDelete = async (
    id: number
  ): Promise<ResponseSuccess> => {
    return await handleRequest(() => ObjectiveService.delete(id));
  };

  return {
    loading,
    error,
    handleObjectiveCreate,
    handleObjectiveDelete,
    handleObjectiveUpdate,
    handleObjectiveRetrieve,
    handleObjectiveList,
  };
}
