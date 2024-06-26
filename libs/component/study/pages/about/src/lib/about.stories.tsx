import type { Meta, StoryObj } from '@storybook/react';
import { About } from './about';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof About> = {
  component: About,
  title: 'PAGES/Study/About',
};
export default meta;
type Story = StoryObj<typeof About>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to About!/gi)).toBeTruthy();
  },
};
