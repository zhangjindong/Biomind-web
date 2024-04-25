import type { Meta, StoryObj } from '@storybook/react';
import { StudyTab } from './study-tab';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyTab> = {
  component: StudyTab,
  title: 'UI组件/Study/StudyTab',
};
export default meta;
type Story = StoryObj<typeof StudyTab>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyTab!/gi)).toBeTruthy();
  },
};
