import { render } from '@testing-library/react';

import StudyPagination from './study-pagination';

describe('StudyPagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyPagination />);
    expect(baseElement).toBeTruthy();
  });
});
