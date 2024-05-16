import type { Meta, StoryObj } from '@storybook/react';
import { Viewport } from './viewport';

import { expect, within } from '@storybook/test';

const meta: Meta<typeof Viewport> = {
  component: Viewport,
  title: 'UI组件/Image/Viewport',
  render: ({ activated }) => (
    <div
      style={{ width: 300, height: 300, backgroundColor: '#eee', padding: 5 }}
    >
      <Viewport activated={activated}></Viewport>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Viewport>;

export const Primary: Story = {
  args: {
    activated: false,
  },
};

export const Heading: Story = {
  args: {
    activated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Viewport!/gi)).toBeTruthy();
  },
};
