import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudySearch from './study-search';

describe('useStudySearch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudySearch());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
