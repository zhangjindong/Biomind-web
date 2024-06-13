import { utilities } from '@cornerstonejs/core';
import { IImage } from '@cornerstonejs/core/dist/types/types';
import { expose } from 'comlink';

import { inflate } from 'pako';
const obj = {
  async decodeBm({ buffer, params, imageId }, ...callbacks) {
    function convertPixel(targetPixel, pixelArray) {
      let index = 0;
      for (let i = 0; i < pixelArray.length; i += 3) {
        targetPixel[index++] = pixelArray[i];
        targetPixel[index++] = pixelArray[i + 1];
        targetPixel[index++] = pixelArray[i + 2];
        targetPixel[index++] = 255; // Alpha channel
      }
      return targetPixel;
    }
    function getPixelValues(pixelData) {
      let minPixelValue = Number.MAX_VALUE;
      let maxPixelValue = Number.MIN_VALUE;
      const len = pixelData.length;
      let pixel = void 0;

      for (let i = 0; i < len; i++) {
        pixel = pixelData[i];
        minPixelValue = minPixelValue < pixel ? minPixelValue : pixel;
        maxPixelValue = maxPixelValue > pixel ? maxPixelValue : pixel;
      }

      return {
        minPixelValue: minPixelValue,
        maxPixelValue: maxPixelValue,
      };
    }
    let {
      signed,
      width,
      height,
      invert = 1,
      format,
      pixel_spacing_x = 1,
      pixel_spacing_y = 1,
      window_center,
      window_width,
      rescale_intercept = 1,
      rescale_slope = 1,
      rows,
      columns,
      name,
      pitch,
      sampleOfPixel,
      depth,
      sop_instance_uid,
    } = params;
    let pixelArray = inflate(buffer);
    let pixelBufferFormat;
    let isColor = false;
    let isRGBA = false;
    // RGB24 format The pixels are stored in 3
    if (format === 3) {
      pixelBufferFormat = 'Uint8';
    } else if (format === 1) {
      // * {summary}{Color image in RGB24 format.}
      // * {description}{This format describes a color image. The pixels are stored in 3 consecutive bytes. The memory layout is RGB.}
      // * PixelFormat_RGB24 = 1,
      const buf = isRGBA
        ? new ArrayBuffer((pixelArray.length / 3) * 4)
        : pixelArray.buffer; // RGB32
      let pixels;
      if (signed) {
        pixels = new Int8Array(buf);
        pixelBufferFormat = 'Int8';
      } else {
        pixels = new Uint8Array(buf);
        pixelBufferFormat = 'Uint8';
      }
      isRGBA
        ? (pixelArray = convertPixel(pixels, pixelArray))
        : (pixelArray = pixels);
      // RGB48 format
    } else if (format === 9) {
      // * {summary}{Color image in RGB48 format.}
      // * {description}{This format describes a color image. The pixels are stored in 6 bytes
      // * consecutive bytes. The memory layout is RGB.}
      // PixelFormat_RGB48 = 9,
      pixelBufferFormat = 'Uint8';
      const number = pixelArray.length / 3 / rows / columns;
      const pixels = new Uint8Array((pixelArray.length / 3) * number * 4); // RGB24
      let index = 0;
      for (let i = 0; i < pixelArray.length; i += 3 * number) {
        pixels[index++] = pixelArray[i + 1];
        pixels[index++] = pixelArray[i + number + 1];
        pixels[index++] = pixelArray[i + 2 * number + 1];
        pixels[index++] = 255; // Alpha channel
      }
      pixelArray = pixels;
    } else {
      if (signed) {
        pixelArray = new Int16Array(pixelArray.buffer);
        pixelBufferFormat = 'Int16';
      } else {
        pixelArray = new Uint16Array(pixelArray.buffer);
        pixelBufferFormat = 'Uint16';
      }
    }
    if ([1, 2, 7, 9].includes(format)) {
      isColor = true;
    }

    const pixelValues = getPixelValues(pixelArray);
    const minPixelValue = pixelValues.minPixelValue;
    const maxPixelValue = pixelValues.maxPixelValue;
    if (!window_center || !window_width) {
      if (!isColor) {
        window_center = (maxPixelValue - minPixelValue) / 2 + minPixelValue;
        window_width = maxPixelValue - minPixelValue;
      } else {
        window_center = 128;
        window_width = 256;
      }
    }

    const id = imageId.split('?')[0];
    const instancePublicid = id.split('/')[id.split('/').length - 1];
    const cornerstoneMetaData = {
      imageId: id,
      instanceID: sop_instance_uid + '_' + instancePublicid.split('_')[1],
      color: isColor,
      columnPixelSpacing: pixel_spacing_y,
      rowPixelSpacing: pixel_spacing_x,
      columns: width,
      rows: height,
      originalWidth: width,
      originalHeight: height,
      width,
      height,
      intercept: rescale_intercept,
      invert: !!invert,
      isSigned: !!signed,
      maxPixelValue: maxPixelValue,
      minPixelValue: minPixelValue,
      sizeInBytes: pixelArray.byteLength,
      slope: rescale_slope,
      windowCenter: window_center,
      windowWidth: window_width,
      pixelData: pixelArray,
      pixelBufferFormat,
      rgba: isRGBA,
      // voiRange: utilities.windowLevel.toLowHighRange(
      //   windowWidth,
      //   window_center
      // ),
    };
    return cornerstoneMetaData;
  },
};

expose(obj);
