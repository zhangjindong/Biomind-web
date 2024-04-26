import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyPagination from './study-pagination';

describe('useStudyPagination', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyPagination());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
