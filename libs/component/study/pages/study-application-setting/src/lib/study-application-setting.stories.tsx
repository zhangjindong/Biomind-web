import type { Meta, StoryObj } from '@storybook/react';
import { StudyApplicationSetting } from './study-application-setting';

import { within, expect } from '@storybook/test';

const meta: Meta<typeof StudyApplicationSetting> = {
  component: StudyApplicationSetting,
  title: 'PAGES/Study/StudyApplicationSetting',
};
export default meta;
type Story = StoryObj<typeof StudyApplicationSetting>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to StudyApplicationSetting!/gi)
    ).toBeTruthy();
  },
};
