import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook genérico para lidar com requisições assíncronas de forma segura.
 * Garante que estados (loading, erro e dados) sejam atualizados apenas
 * se o componente ainda estiver montado.
 */
export const useHandleRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Evita atualizações de estado após desmontagem
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    <T>(setter: (value: T) => void, value: T) => {
      if (mountedRef.current) setter(value);
    },
    []
  );

  /**
   * Executa uma função assíncrona e gerencia loading + erro automaticamente.
   *
   * @param fn Função que retorna uma Promise (requisição)
   * @param setter (opcional) Função que recebe os dados da resposta
   */
  const handleRequest = useCallback(
    async <T>(fn: () => Promise<T>, setter?: (data: T) => void) => {
      safeSetState(setLoading, true);
      safeSetState(setError, null);

      try {
        const result = await fn();
        if (setter) safeSetState(setter, result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro desconhecido.';
        safeSetState(setError, message);
        throw err;
      } finally {
        safeSetState(setLoading, false);
      }
    },
    [safeSetState]
  );

  return {
    handleRequest,
    loading,
    error,
  };
};
