import { render } from '@testing-library/react';

import StudySearch from './study-search';

describe('StudySearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudySearch />);
    expect(baseElement).toBeTruthy();
  });
});
