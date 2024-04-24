import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { composeStories } from '@storybook/react';
import * as LoginStories from './login.stories';
import { userEvent } from '@storybook/test';
const { Initial, Error, Heading } = composeStories(LoginStories);
describe('component --> pages --> Login', () => {
  it('应在：初始时正常显示组件', () => {
    const { baseElement } = render(<Initial />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it('应在：输入账号、密码时正常显示', () => {
    const { baseElement } = render(<Error />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('用户名密码错误')).toBeInTheDocument();
  });
  it('应在：点击登录时，正常触发onLogin', async () => {
    let baseElement;
    const onlogin = vi.fn();
    await act(async () => {
      baseElement = await render(<Heading onLogin={onlogin} />).baseElement;
    });
    expect(baseElement).toBeTruthy();
    await act(async () => {
      await userEvent.type(screen.getByTestId('username'), 'zhangsan');
      await userEvent.type(screen.getByTestId('password'), 'password');
      await userEvent.click(screen.getByTestId('submit'));
      expect(onlogin).toHaveBeenLastCalledWith('zhangsan', 'password');
    });
  });
  it('应在：userinfo有值时正常显示', () => {
    const { baseElement } = render(<Error userinfo='密码错误'/>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('密码错误')).toBeInTheDocument();
  });
});
