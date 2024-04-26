import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseStudyNav {
  count: number;
  increment: () => void;
}

export function useStudyNav(): UseStudyNav {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default useStudyNav;
