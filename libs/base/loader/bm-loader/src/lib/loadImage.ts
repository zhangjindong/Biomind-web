import {
  ImageLoaderFn,
  IImageLoadObject,
  IImage,
} from '@cornerstonejs/core/dist/types/types';
import parseImageId from './parseImageId';
import { imageLoadPoolManager, metaData, utilities } from '@cornerstonejs/core';
import { map } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import bmParser from './bm-parser';
import { ByteArray, DataSet } from 'dicom-parser';
import { getWebWorkerManager } from '@cornerstonejs/core';
import dataSetCacheManager from './dataSetCacheManager';

const workerManager = getWebWorkerManager();

const loadImage: ImageLoaderFn = (imageId, options): IImageLoadObject => {
  const { scheme, url, frame, pixelDataFrame } = parseImageId(imageId);
  // imagePixelModule
  // { pixelRepresentation,
  //   bitsAllocated,
  //   bitsStored,
  //   highBit,
  //   photometricInterpretation,
  //   samplesPerPixel,}
  // generalSeriesModule   modality
  // scalingModule

  // imagePlaneModule
  const start = new Date().getTime();
  const uncompressedIterator = new utilities.ProgressiveIterator<IImage>(
    'decompress'
  );
  const tag = metaData.get('imageTagsModule', imageId);

  const requestType = options?.['requestType'] || 'interaction';
  const additionalDetails = options?.['additionalDetails'] || { imageId };
  const priority =
    options?.['priority'] === undefined ? 5 : options?.['priority'];

  const xhr$ = ajax<ArrayBuffer>({
    url: url,
    responseType: 'arraybuffer',
  }).pipe(
    map((res) => ({
      pixelData: res.response,
      done: true,
      extractDone: true,
    }))
  );
  let abortAjax: () => void;
  const xhrPromise = new Promise((resolve, reject) => {
    abortAjax = xhr$.subscribe({
      next: resolve,
      error: reject,
    }).unsubscribe;
  });
  imageLoadPoolManager.addRequest(
    async () => {
      uncompressedIterator.generate(async (it) => {
        const compressedIt = utilities.ProgressiveIterator.as(xhrPromise);

        for await (const result of compressedIt) {
          const { pixelData, done = true, extractDone = true } = result;
          const byteArray = new Uint8Array(pixelData.slice(0, 128));
          const dataSet = bmParser.parseDicom(byteArray, {
            ...[tag],
            x7fe00010: byteArray,
          });
          dataSetCacheManager.add(url, dataSet);
          const transferSyntax = dataSet.string('x00020010');
          // console.log('width', dataSet.uint32('width'));
          // console.log('height', dataSet.uint32('height'));
          const image = await createImage(
            imageId,
            pixelData.slice(128, -1),
            dataSet
          );
          // add the loadTimeInMS property
          const end = new Date().getTime();
          image.loadTimeInMS = end - start;
          image.transferSyntaxUID = transferSyntax;
          it.add(image, done);
        }
      });
    },
    requestType,
    additionalDetails,
    priority
  );
  return {
    promise: uncompressedIterator.getDonePromise(),
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
          (progress) => {
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
        };
        resolve(image);
      })
      .catch(reject);
  });
export { loadImage };
