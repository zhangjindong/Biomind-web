import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseStudyPagination {
  count: number;
  increment: () => void;
}

export function useStudyPagination(): UseStudyPagination {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default useStudyPagination;
