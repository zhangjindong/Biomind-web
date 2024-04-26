import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyBar from './study-bar';

describe('useStudyBar', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyBar());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
