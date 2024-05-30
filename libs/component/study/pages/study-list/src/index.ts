import { load } from 'react-intl-universal';
export * from './lib/study-list';
load({
  'zh-CN': import('./locales/zh_CN.json'),
  'en-US': import('./locales/en_US.json'),
});
