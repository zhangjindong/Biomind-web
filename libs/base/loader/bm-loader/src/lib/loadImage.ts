import {
  ImageLoaderFn,
  IImageLoadObject,
  IImage,
} from '@cornerstonejs/core/dist/types/types';
import parseImageId from './parseImageId';
import { imageLoadPoolManager, metaData } from '@cornerstonejs/core';
import { RequestType } from '@cornerstonejs/core/dist/types/enums';
import { url } from 'inspector';
import { lastValueFrom, map } from 'rxjs';
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

  const tag = metaData.get('imageTagsModule', imageId);
  return {
    promise: loadImagePromiseWithTag(url, imageId, tag, {}),
    cancelFn: () => undefined,
    decache: () => undefined,
  };
};

const loadImagePromiseWithTag = (
  url: string,
  imageId: string,
  tags: any,
  defaultHeaders: Record<string, string> | undefined
) =>
  new Promise<IImage>((resolve, reject) => {
    imageLoadPoolManager.addRequest(
      () => {
        return lastValueFrom(
          ajax<ArrayBuffer>({
            url: url,
            responseType: 'arraybuffer',
            ...defaultHeaders,
          }).pipe(map((res) => res.response))
        )
          .then((bmPartAsArrayBuffer) => {
            const byteArray = new Uint8Array(bmPartAsArrayBuffer);
            const dataSet = bmParser.parseDicom(byteArray, {
              ...tags,
              x7fe00010: byteArray,
            });
            dataSetCacheManager.add(url, dataSet);
            const transferSyntax = dataSet.string('x00020010');
            resolve(createImage(imageId, byteArray.slice(128, -1), dataSet));
          })
          .catch(reject);
      },
      'prefetch' as RequestType,
      { imageId }
    );
  });
const createImage = (
  imageId: string,
  pixelData: ByteArray,
  dataSet: DataSet
  // options: DICOMLoaderImageOptions = {}
) =>
  new Promise((resolve, reject) => {
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
          color: imageFrame.isColor,
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
          rgba: imageFrame.isColor && false,
          getPixelData: () => imageFrame.pixelData,
          getCanvas: undefined,
          numComps: undefined,
        };
        resolve(image);
      })
      .catch(reject);
  });
export { loadImage };
