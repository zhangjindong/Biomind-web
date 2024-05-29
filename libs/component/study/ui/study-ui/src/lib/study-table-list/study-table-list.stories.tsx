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
  args: {
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',width: 300,
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    dataSource: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
    ],
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to StudyTableList!/gi)).toBeTruthy();
  },
};
