import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook with loading, error, and refetch.
 * @param {Function} fetcher - async function returning data
 * @param {Array} deps - dependency array
 * @param {*} initial - initial state
 */
export function useFetch(fetcher, deps = [], initial = null) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mounted.current) setData(result);
    } catch (err) {
      if (mounted.current) {
        const msg = err?.response?.data?.message || err?.message || 'Something went wrong';
        setError(msg);
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mounted.current = true;
    run();
    return () => { mounted.current = false; };
  }, [run]);

  return { data, loading, error, refetch: run, setData };
}
