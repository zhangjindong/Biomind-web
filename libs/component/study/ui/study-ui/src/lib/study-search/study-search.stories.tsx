import type { Meta, StoryObj } from '@storybook/react';
import { StudySearch } from './study-search';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudySearch> = {
  component: StudySearch,
  title: 'UI组件/Study/StudySearch',
};
export default meta;
type Story = StoryObj<typeof StudySearch>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudySearch!/gi)).toBeTruthy();
  },
};
