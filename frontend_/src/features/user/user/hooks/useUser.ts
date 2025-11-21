import { useHandleRequest } from '@/share/hooks/useHandleRequest';
import { UserService } from '../UserService';

export function useUser() {
  const { error, handleRequest, loading } = useHandleRequest();

  const handleUserRetrieve = async () => {
    return await handleRequest(() => UserService.retrieve());
  };

  const handleUserUpdate = async () => {
    return await handleRequest(() => UserService.retrieve());
  };

  return {
    error,
    loading,
    handleUserRetrieve,
    handleUserUpdate,
  };
}
