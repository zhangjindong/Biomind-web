import { useState, useCallback } from 'react';

export interface UseStudyHeader {
  count: number;
  increment: () => void;
}

export function useStudyHeader(): UseStudyHeader {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default useStudyHeader;
