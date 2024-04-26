import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useStudyTableList from './study-table-list';

describe('useStudyTableList', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStudyTableList());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
