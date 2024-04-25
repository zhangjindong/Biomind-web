import type { Meta, StoryObj } from '@storybook/react';
import { StudyNav } from './study-nav';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyNav> = {
  component: StudyNav,
  title: 'UI组件/Study/StudyNav',
};
export default meta;
type Story = StoryObj<typeof StudyNav>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyNav!/gi)).toBeTruthy();
  },
};
