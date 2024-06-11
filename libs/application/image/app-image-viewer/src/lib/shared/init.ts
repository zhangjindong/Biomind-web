import { init as csRenderInit } from '@cornerstonejs/core';
import { init as csToolsInit } from '@cornerstonejs/tools';
import { Cornerstone3DConfig } from '@cornerstonejs/core/dist/types/types';
import { initProviders } from './initProviders';
import { initCornerstoneDICOMImageLoader } from './initCornerstoneDICOMImageLoader';
import { initVolumeLoader } from './initVolumeLoader';
import { registerBmWebLoad } from '@biomind-web/bm-loader';
import { addManipulationTool } from './addTools';
/**
 * 初始化cornerstone 渲染引擎
 */
export const initCornerstone = async (config?: Cornerstone3DConfig) => {
  registerBmWebLoad();
  initProviders();
  initCornerstoneDICOMImageLoader();
  initVolumeLoader();
  const initialized = await csRenderInit(config);
  csToolsInit();
  console.log('initCornerstone', initialized);
  // addManipulationTool();
  return initialized;
};
