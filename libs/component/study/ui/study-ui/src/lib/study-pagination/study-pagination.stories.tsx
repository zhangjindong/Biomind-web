import type { Meta, StoryObj } from '@storybook/react';
import { StudyPagination } from './study-pagination';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyPagination> = {
  component: StudyPagination,
  title: 'UI组件/Study/StudyPagination',
};
export default meta;
type Story = StoryObj<typeof StudyPagination>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyPagination!/gi)).toBeTruthy();
  },
};
