import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseStudyTableList {
  count: number;
  increment: () => void;
}

export function useStudyTableList(): UseStudyTableList {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default useStudyTableList;
