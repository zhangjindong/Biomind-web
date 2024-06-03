import { init } from 'react-intl-universal';
import zh_CN from './locales/zh_CN.json';
import en_US from './locales/en_US.json';
export * from './lib/study-list';
init({
  currentLocale: 'zh-CN',
  locales: {
    'zh-CN': zh_CN,
    'en-US': en_US,
  },
});
