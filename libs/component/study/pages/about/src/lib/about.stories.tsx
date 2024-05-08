import type { Meta, StoryObj } from '@storybook/react';
import { About } from './about';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof About> = {
  component: About,
  title: 'About',
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
