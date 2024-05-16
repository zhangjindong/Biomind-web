import {
  cornerstoneStreamingImageVolumeLoader,
  cornerstoneStreamingDynamicImageVolumeLoader,
} from '@cornerstonejs/streaming-image-volume-loader';

import { volumeLoader } from '@cornerstonejs/core';
import { VolumeLoaderFn } from '@cornerstonejs/core/dist/types/types';
/**
 * 初始化cornerstone 渲染引擎
 */
export const initVolumeLoader = () => {
  volumeLoader.registerUnknownVolumeLoader(
    cornerstoneStreamingImageVolumeLoader as unknown as VolumeLoaderFn
  );
  volumeLoader.registerVolumeLoader(
    'cornerstoneStreamingImageVolume',
    cornerstoneStreamingImageVolumeLoader as unknown as VolumeLoaderFn
  );
  volumeLoader.registerVolumeLoader(
    'cornerstoneStreamingDynamicImageVolume',
    cornerstoneStreamingDynamicImageVolumeLoader as unknown as VolumeLoaderFn
  );
};
