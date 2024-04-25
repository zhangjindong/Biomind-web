import type { Meta, StoryObj } from '@storybook/react';
import { StudyTableList } from './study-table-list';

import { within, expect, userEvent, fn, waitFor } from '@storybook/test';

const meta: Meta<typeof StudyTableList> = {
  component: StudyTableList,
  title: 'UI组件/Study/StudyTableList',
};
export default meta;
type Story = StoryObj<typeof StudyTableList>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyTableList!/gi)).toBeTruthy();
  },
};
