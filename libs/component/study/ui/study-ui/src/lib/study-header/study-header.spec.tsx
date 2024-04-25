import { render } from '@testing-library/react';

import StudyHeader from './study-header';

describe('StudyHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyHeader />);
    expect(baseElement).toBeTruthy();
  });
});
