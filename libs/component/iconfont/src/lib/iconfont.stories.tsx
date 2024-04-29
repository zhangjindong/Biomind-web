import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Iconfont } from './iconfont';
const meta: Meta<typeof Iconfont> = {
  component: Iconfont,
  title: 'ui组件/common/Iconfont',
  argTypes: {
    type: {
      description: 'Icon 图标名',
      type: 'string',
      defaultValue: 'xuanzhong-Select',
    },
    className: {
      description: '类名',
      type: 'string',
      defaultValue: 'text-gray-800',
    },
  },
  args: {
    type: 'buju',
    className: 'hover:text-5xl hover:!text-5xl text-4xl transition-all',
  },
  render: function Render(args) {
    console.log(args.className, meta.args?.className);

    const className = args.className + ' ' + meta.args?.className;
    // console.log(args, className);

    return <Iconfont {...args} className={className} />;
  },
};
export default meta;
type Story = StoryObj<typeof Iconfont>;

export const IconSize = {
  name: 'Icon大小通过font-size修改',
  args: {
    className: '!text-3xl',
  },
};

export const Color: Story = {
  name: 'Icon颜色通过color修改',
  args: {
    className: '!text-red-600',
  },
};

export const Type: Story = {
  name: 'Icon样式通过type修改',
  args: {
    type: 'baocun-preservation',
    className: '',
  },
};
