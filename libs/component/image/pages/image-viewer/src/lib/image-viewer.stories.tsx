import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from './image-viewer';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ImageViewer> = {
  component: ImageViewer,
  title: 'ImageViewer',
};
export default meta;
type Story = StoryObj<typeof ImageViewer>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ImageViewer!/gi)).toBeTruthy();
  },
};
