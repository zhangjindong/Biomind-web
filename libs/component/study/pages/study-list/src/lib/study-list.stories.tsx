import type { Meta, StoryObj } from '@storybook/react';
import { StudyListPage } from './study-list';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof StudyListPage> = {
  component: StudyListPage,
  title: 'PAGES/Study/StudyListPage',
};
export default meta;
type Story = StoryObj<typeof StudyListPage>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyListPage!/gi)).toBeTruthy();
  },
};
