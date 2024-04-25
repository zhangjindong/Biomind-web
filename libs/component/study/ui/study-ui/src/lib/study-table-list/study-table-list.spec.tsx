import { render } from '@testing-library/react';

import StudyTableList from './study-table-list';

describe('StudyTableList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyTableList />);
    expect(baseElement).toBeTruthy();
  });
});
