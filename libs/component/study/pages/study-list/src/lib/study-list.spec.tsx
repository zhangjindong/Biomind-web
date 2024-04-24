import { render } from '@testing-library/react';

import StudyList from './study-list';

describe('StudyList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyList />);
    expect(baseElement).toBeTruthy();
  });
});
