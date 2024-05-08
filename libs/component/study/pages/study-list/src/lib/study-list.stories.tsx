import type { Meta, StoryObj } from '@storybook/react';
import { StudyList } from './study-list';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof StudyList> = {
  component: StudyList,
  title: 'PAGES/Study/StudyList',
};
export default meta;
type Story = StoryObj<typeof StudyList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyList!/gi)).toBeTruthy();
  },
};
