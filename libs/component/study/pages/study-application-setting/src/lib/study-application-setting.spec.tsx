import { render } from '@testing-library/react';

import StudyApplicationSetting from './study-application-setting';

describe('StudyApplicationSetting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyApplicationSetting />);
    expect(baseElement).toBeTruthy();
  });
});
