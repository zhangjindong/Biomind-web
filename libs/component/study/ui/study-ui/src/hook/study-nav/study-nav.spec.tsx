import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyNav from './study-nav';

describe('useStudyNav', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyNav());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
