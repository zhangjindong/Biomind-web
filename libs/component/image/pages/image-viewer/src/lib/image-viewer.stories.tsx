import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewerPage } from './image-viewer';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof ImageViewerPage> = {
  component: ImageViewerPage,
  title: 'PAGES/Image/ImageViewerPage',
};
export default meta;
type Story = StoryObj<typeof ImageViewerPage>;

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
