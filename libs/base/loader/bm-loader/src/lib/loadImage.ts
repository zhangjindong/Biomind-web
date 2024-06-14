import {
  Enums,
  getWebWorkerManager,
  imageLoadPoolManager,
  metaData,
} from '@cornerstonejs/core';
import {
  IImage,
  IImageLoadObject,
  ImageLoaderFn,
} from '@cornerstonejs/core/dist/types/types';
import { ByteArray, DataSet } from 'dicom-parser';
import { map } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import bmParser from './bm-parser';
import dataSetCacheManager from './dataSetCacheManager';
import parseImageId from './parseImageId';
const workerManager = getWebWorkerManager();

imageLoadPoolManager.setMaxSimultaneousRequests(
  Enums.RequestType.Interaction,
  6
);
imageLoadPoolManager.setMaxSimultaneousRequests(Enums.RequestType.Prefetch, 12);
imageLoadPoolManager.setMaxSimultaneousRequests(
  Enums.RequestType.Thumbnail,
  16
);
const loadImage: ImageLoaderFn = (imageId, options): IImageLoadObject => {
  const { url } = parseImageId(imageId);
  // imagePlaneModule
  const start = new Date().getTime();
  const tag = metaData.get('imageTagsModule', imageId);

  const xhr$ = ajax<ArrayBuffer>({
    url: url,
    responseType: 'arraybuffer',
  }).pipe(
    map((res) => ({
      pixelData: res.response,
    }))
  );
  let abortAjax: () => void;
  const xhrPromise = new Promise<{
    pixelData: ArrayBuffer;
  }>((resolve, reject) => {
    abortAjax = xhr$.subscribe({
      next: resolve,
      error: reject,
    }).unsubscribe;
  });
  const sendRequest = xhrPromise.then((result) => {
    const { pixelData } = result;
    const byteArray = new Uint8Array(pixelData.slice(0, 128));
    const dataSet = bmParser.parseDicom(
      byteArray,
      {},
      {
        ...[tag],
        x7fe00010: byteArray,
      }
    );
    dataSetCacheManager.add(url, dataSet);
    const transferSyntax = dataSet.string('x00020010');
    // console.log('width', dataSet.uint32('width'));
    // console.log('height', dataSet.uint32('height'));
    return createImage(
      imageId,
      pixelData.slice(128, -1) as Uint8Array,
      dataSet
    ).then((image) => {
      // add the loadTimeInMS property
      const end = new Date().getTime();
      image.loadTimeInMS = end - start;
      // image.transferSyntaxUID = transferSyntax;
      return image;
    });
  });
  return {
    promise: sendRequest,
    cancelFn: () => {
      // 取消分两步、第一步 取消排队中的请求，停止轮询
      imageLoadPoolManager.destroy();
      // 第二步、并发中的请求，集体abort；
      abortAjax && abortAjax();
    },
    decache: () => undefined,
  };
};

// const loadImagePromiseWithTag = async (
//   url: string,
//   imageId: string,
//   tags: any,
//   defaultHeaders: Record<string, string> | undefined,
//   uncompressedIterator: utilities.ProgressiveIterator<IImage>,
//   start: number,
//   options
// ) =>
const createImage = (
  imageId: string,
  pixelData: ByteArray,
  dataSet: DataSet
  // options: DICOMLoaderImageOptions = {}
) =>
  new Promise<IImage>((resolve, reject) => {
    const decodePromise = workerManager.executeTask(
      'bm-worker',
      'decodeBm',
      {
        buffer: pixelData,
        params: {
          name: dataSet.string('name'),
          width: dataSet.uint32('width'),
          height: dataSet.uint32('height'),
          rows: dataSet.uint32('width'),
          columns: dataSet.uint32('height'),
          pitch: dataSet.uint32('pitch'),
          sampleOfPixel: dataSet.uint32('sampleOfPixel'),
          depth: dataSet.uint32('depth'),
          signed: dataSet.uint32('signed'),
          format: dataSet.uint32('format'),
          invert: dataSet.uint32('invert'),
          window_center: dataSet.float('window_center'),
          window_width: dataSet.float('window_width'),
          rescale_slope: dataSet.float('rescale_slope'),
          rescale_intercept: dataSet.float('rescale_intercept'),
          pixel_spacing_x: dataSet.float('pixel_spacing_x'),
          pixel_spacing_y: dataSet.float('pixel_spacing_y'),
          sop_instance_uid: '',
        },
        imageId,
      },
      {
        callbacks: [
          (progress: any) => {
            console.debug('progress', progress);
          },
        ],
      }
    );
    decodePromise
      .then(function (imageFrame: any) {
        const image = {
          imageId,
          color: imageFrame.color,
          calibration: null, // calibrationModule,
          columnPixelSpacing: null, // imagePlaneModule.columnPixelSpacing,
          columns: imageFrame.columns,
          height: imageFrame.rows,
          preScale: imageFrame.preScale,
          intercept: imageFrame.intercept,
          slope: imageFrame.slope,
          invert: imageFrame.photometricInterpretation === 'MONOCHROME2',
          minPixelValue: imageFrame.smallestPixelValue,
          maxPixelValue: imageFrame.largestPixelValue,
          rowPixelSpacing: imageFrame.rowPixelSpacing,
          rows: imageFrame.rows,
          sizeInBytes: imageFrame.pixelData.byteLength,
          width: imageFrame.columns,
          // use the first value for rendering, if other values
          // are needed later, it can be grabbed again from the voiLUtModule
          windowCenter: imageFrame.windowCenter,
          windowWidth: imageFrame.windowWidth,
          voiLUTFunction: undefined, // voiLutModule.voiLUTFunction

          // ? voiLutModule.voiLUTFunction
          // : undefined,
          decodeTimeInMS: imageFrame.decodeTimeInMS,
          floatPixelData: undefined,
          imageFrame,
          rgba: imageFrame.rgba,
          getPixelData: () => imageFrame.pixelData,
          getCanvas: undefined,
          numComps: undefined,
        } as unknown as IImage;
        resolve(image);
      })
      .catch(reject);
  });
export { loadImage };
