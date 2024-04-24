import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './login';
import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'Login',
  argTypes: {
    onLogin: {
      action: 'onLogin executed!',
      description: '登录事件',
      type: 'function',
      defaultValue: null,
    },
    userinfo: {
      description: '响应内容、错误信息',
      type: 'string',
      defaultValue: null,
    },
  },
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Initial = {
  args: {},
};

export const Error = {
  args: {
    userinfo: '用户名密码错误',
  },
};

export const Heading: Story = {
  args: {
    onLogin: fn(),
    userinfo: '用户名密码错误',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('输入登录账号', async () => {
      // 👇 Simulate interactions with the component
      await userEvent.type(canvas.getByTestId('username'), 'zhangsan');

      await userEvent.type(canvas.getByTestId('password'), 'password');
    });

    await step('点击登录', async () => {
      // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
      await userEvent.click(canvas.getByTestId('submit'));
    });
    await waitFor(() => expect(args.onLogin).toHaveBeenCalled());
    // 👇 Assert DOM structure
    await expect(canvas.getByText('用户名密码错误')).toBeInTheDocument();
  },
};
