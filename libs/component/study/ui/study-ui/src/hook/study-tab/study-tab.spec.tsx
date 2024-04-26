import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyTab from './study-tab';

describe('useStudyTab', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyTab());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
