import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { ObjectiveService } from '../ObjectiveService';

export function useObjective() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleObjectiveList = async () => {
    return await handleRequest(() => ObjectiveService.list());
  };

  const handleObjectiveRetrieve = async (id: number) => {
    return await handleRequest(() => ObjectiveService.retrieve(id));
  };

  const handleObjectiveCreate = async (data: any) => {
    return await handleRequest(() => ObjectiveService.create(data));
  };

  const handleObjectiveUpdate = async (id: number, data: any) => {
    return await handleRequest(() => ObjectiveService.update(id, data));
  };

  const handleObjectiveDelete = async (id: number) => {
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
