import { useEffect, useState, useCallback } from 'react';

interface UseLoadListParams<T> {
  loader: () => Promise<T[]> | Promise<T | null>;
  deps?: any[];
}

export function useLoadList<T>({ loader, deps = [] }: UseLoadListParams<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loader();
      setData(Array.isArray(result) ? result : result ? [result] : []);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    let isMounted = true;

    load();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error, setData, reload: load };
}
