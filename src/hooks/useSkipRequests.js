import { useState, useCallback } from 'react';
import { skipPauseService } from '@/services/skipPauseService';

/** Manages a student's skip/pause requests with instant local updates. */
export function useSkipRequests() {
  const [skips, setSkips] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await skipPauseService.getMySkips();
      setSkips(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSkip = useCallback(async (payload) => {
    const created = await skipPauseService.createSkip(payload);
    setSkips((prev) => [created, ...(prev || [])]);
    return created;
  }, []);

  const cancelSkip = useCallback(async (id) => {
    const updated = await skipPauseService.cancelSkip(id);
    setSkips((prev) => (prev || []).map((s) => (s.id === id ? updated : s)));
    return updated;
  }, []);

  return { skips, loading, load, createSkip, cancelSkip, setSkips };
}
