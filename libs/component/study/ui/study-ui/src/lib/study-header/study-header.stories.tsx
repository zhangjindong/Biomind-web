import type { Meta, StoryObj } from '@storybook/react';
import { StudyHeader } from './study-header';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyHeader> = {
  component: StudyHeader,
  title: 'UI组件/Study/StudyHeader',
};
export default meta;
type Story = StoryObj<typeof StudyHeader>;

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
