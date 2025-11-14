import { useState, useCallback, useRef, useEffect } from 'react';

export const useHandleRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
