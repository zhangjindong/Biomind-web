import type { Meta, StoryObj } from '@storybook/react';
import { ImageHeader } from './image-header';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ImageHeader> = {
  component: ImageHeader,
  title: 'ImageHeader',
};
export default meta;
type Story = StoryObj<typeof ImageHeader>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageHeader!/gi)).toBeTruthy();
  },
};
