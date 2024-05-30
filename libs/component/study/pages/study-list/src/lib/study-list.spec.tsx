import { render } from '@testing-library/react';

import { StudyListPage } from './study-list';

describe('StudyList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyListPage />);
    expect(baseElement).toBeTruthy();
  });
});
