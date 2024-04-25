import { render } from '@testing-library/react';

import StudyBar from './study-bar';

describe('StudyBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyBar />);
    expect(baseElement).toBeTruthy();
  });
});
