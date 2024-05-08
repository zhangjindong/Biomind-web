import { render } from '@testing-library/react';

import ImageHeader from './image-header';

describe('ImageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
