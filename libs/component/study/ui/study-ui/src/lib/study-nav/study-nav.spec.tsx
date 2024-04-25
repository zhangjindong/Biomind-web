import { render } from '@testing-library/react';

import StudyNav from './study-nav';

describe('StudyNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyNav />);
    expect(baseElement).toBeTruthy();
  });
});
