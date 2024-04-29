import { render } from '@testing-library/react';

import Iconfont from './iconfont';

describe('Iconfont', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Iconfont />);
    expect(baseElement).toBeTruthy();
  });
});
