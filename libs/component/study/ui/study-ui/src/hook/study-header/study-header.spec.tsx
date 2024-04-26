import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyHeader from './study-header';

describe('useStudyHeader', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyHeader());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
