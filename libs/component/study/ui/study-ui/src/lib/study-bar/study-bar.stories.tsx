import type { Meta, StoryObj } from '@storybook/react';
import { StudyBar } from './study-bar';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyBar> = {
  component: StudyBar,
  title: 'UI组件/Study/StudyBar',
};
export default meta;
type Story = StoryObj<typeof StudyBar>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyBar!/gi)).toBeTruthy();
  },
};
