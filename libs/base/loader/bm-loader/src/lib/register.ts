import { metaData, registerImageLoader } from '@cornerstonejs/core';
import { loadImage } from './loadImage';
import { registerBmWebWorker } from './register-web-worker';
import { metaDataProvider } from './metaData/metaDataProvider';

export function registerBmWebLoad() {
  registerImageLoader('bmweb', loadImage);
  registerBmWebWorker();

  metaData.addProvider(metaDataProvider);
}
