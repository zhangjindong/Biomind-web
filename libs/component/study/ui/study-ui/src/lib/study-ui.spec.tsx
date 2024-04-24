import { render } from '@testing-library/react';

import StudyUi from './study-ui';

describe('StudyUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyUi />);
    expect(baseElement).toBeTruthy();
  });
});
