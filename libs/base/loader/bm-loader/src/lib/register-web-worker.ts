import { getWebWorkerManager } from '@cornerstonejs/core';
import BmDecodeWorker from './bm-decode-worker?worker';
export function registerBmWebWorker() {
  const workerFn = () => {
    return new BmDecodeWorker({
      name: 'bm-decode-worker', // name used by the browser to name the worker
    });
  };

  const workerManager = getWebWorkerManager();

  const options = {
    // maxWorkerInstances: 1,
    // overwrite: false
  };

  workerManager.registerWorker('bm-worker', workerFn, options);
}
