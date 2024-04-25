import '../src/styles.css';
import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Pages',
          'UI组件',
          '*',
        ],
      },
    },
  },
};

export default preview;
