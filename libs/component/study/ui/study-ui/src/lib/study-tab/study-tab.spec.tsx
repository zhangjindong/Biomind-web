import { render } from '@testing-library/react';

import StudyTab from './study-tab';

describe('StudyTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyTab />);
    expect(baseElement).toBeTruthy();
  });
});
