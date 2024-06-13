import {
  DataSet,
  ParseDicomOptions,
  parseDA,
  parseTM,
  Element,
} from 'dicom-parser';
import * as dicomParse from 'dicom-parser';
function parseDicom(
  byteArray: Uint8Array,
  option?: ParseDicomOptions,
  tags?: Record<string, any>
): DataSet {
  const littleEndianByteStream = new dicomParse.ByteStream(
    dicomParse.littleEndianByteArrayParser,
    byteArray,
    0
  );
  const props: Element[] = [
    { tag: 'name', length: 2, dataOffset: 0 }, // 2            //
    { tag: 'width', length: 4, dataOffset: 1 * 4 }, // 4           // 512
    { tag: 'height', length: 4, dataOffset: 2 * 4 }, // 4          // 512
    { tag: 'pitch', length: 4, dataOffset: 3 * 4 }, // 4          // 1024
    { tag: 'sampleOfPixel', length: 4, dataOffset: 4 * 4 }, // 4   // 1     | 3
    { tag: 'depth', length: 4, dataOffset: 5 * 4 }, // 4           // 16    | 8
    { tag: 'signed', length: 4, dataOffset: 6 * 4 }, // 4          // 0 | 1 | 0
    { tag: 'format', length: 4, dataOffset: 7 * 4 }, // 4          // 4 | 5 | 1 | 9
    { tag: 'invert', length: 4, dataOffset: 8 * 4 }, // 4          // 4 | 5 | 1 | 9
    { tag: 'window_center', length: 4, dataOffset: 9 * 4 }, // 4   // format Float32Array
    { tag: 'window_width', length: 4, dataOffset: 10 * 4 }, // 4
    { tag: 'rescale_slope', length: 4, dataOffset: 11 * 4 }, // 4
    { tag: 'rescale_intercept', length: 4, dataOffset: 12 * 4 }, // 4
    { tag: 'pixel_spacing_x', length: 4, dataOffset: 13 * 4 }, // 4
    { tag: 'pixel_spacing_y', length: 4, dataOffset: 14 * 4 }, // 4
    {
      tag: 'x00280100',
      length: 0,
      dataOffset: 0,
      parser: {
        readInt16: () => 8,
        readUint32: () => 8,
        readInt32: () => 8,
        readFloat: () => 8,
        readDouble: () => 8,
        readUint16: () => 8,
      },
    }, //bitsAllocated | format
    { tag: 'rows', length: 4, dataOffset: 1 * 4 }, // 4  rows
    { tag: 'columns', length: 4, dataOffset: 2 * 4 }, // 4  columns
    { tag: 'x7fe00010', dataOffset: 128, length }, // pixel data
  ];
  const elements: {
    [tag: string]: Element;
  } = {};
  for (const element of props) {
    elements[element.tag] = element;
  }
  if (tags && Array.isArray(tags)) {
    for (const key in tags) {
      //
      if (Object.prototype.hasOwnProperty.call(tags, key)) {
        const element = tags[key];
        // elements[key] = { tag: key, Value: element };
      }
    }
  }
  const dataSet: DataSet = new (dicomParse as any).DataSet(
    littleEndianByteStream.byteArrayParser,
    littleEndianByteStream.byteArray,
    elements
  );
  const fx00280002 = () =>
    -129 / (dataSet.uint32('width') || 0) / (dataSet.uint32('height') || 0);
  dataSet.elements['x00280002'] = {
    tag: 'x00280002',
    length: 0,
    dataOffset: 0,
    parser: {
      readInt16: fx00280002,
      readUint32: fx00280002,
      readInt32: fx00280002,
      readFloat: fx00280002,
      readDouble: fx00280002,
      readUint16: fx00280002,
    },
  }; // samplesPerPixel
  // console.log('name', dataSet.string('name'));
  // console.log('width', dataSet.uint32('width'));
  // console.log('height', dataSet.uint32('height'));
  // console.log('pitch', dataSet.uint32('pitch'));
  // console.log('sampleOfPixel', dataSet.uint32('sampleOfPixel'));
  // console.log('depth', dataSet.uint32('depth'));
  // console.log('signed', dataSet.uint32('signed'));
  // console.log('format', dataSet.uint32('format'));
  // console.log('invert', dataSet.uint32('invert'));
  // console.log('window_center', dataSet.float('window_center'));
  // console.log('window_width', dataSet.float('window_width'));
  // console.log('rescale_slope', dataSet.float('rescale_slope'));
  // console.log('rescale_intercept', dataSet.float('rescale_intercept'));
  // console.log('pixel_spacing_x', dataSet.float('pixel_spacing_x'));
  // console.log('pixel_spacing_y', dataSet.float('pixel_spacing_y'));

  // const littleEndianByteStream = new dicomParse.ByteStream(
  //   dicomParse.littleEndianByteArrayParser,
  //   byteArray,
  //   128
  // );
  return dataSet;
}

export default { parseDA, parseTM, parseDicom };
