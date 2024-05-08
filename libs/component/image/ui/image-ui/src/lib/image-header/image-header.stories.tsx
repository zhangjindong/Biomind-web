import type { Meta, StoryObj } from '@storybook/react';
import { ImageHeader } from './image-header';
import { within, expect } from '@storybook/test';

const meta: Meta<typeof ImageHeader> = {
  component: ImageHeader,
  title: 'UI组件/Image/ImageHeader',
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
    await expect(canvas.findByRole('img')).toBeTruthy();
    await expect(canvas.findByTitle('biomind')).toBeTruthy();
  },
};
