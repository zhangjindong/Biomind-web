import dataSetCacheManager from '../dataSetCacheManager';
import parseImageId from '../parseImageId';
import bmParser from '../bm-parser';

enum MetadataModules {
  CALIBRATION = 'calibrationModule',
  CINE = 'cineModule',
  GENERAL_IMAGE = 'generalImageModule',
  GENERAL_SERIES = 'generalSeriesModule',
  GENERAL_STUDY = 'generalStudyModule',
  IMAGE_PIXEL = 'imagePixelModule',
  IMAGE_PLANE = 'imagePlaneModule',
  IMAGE_URL = 'imageUrlModule',
  MODALITY_LUT = 'modalityLutModule',
  MULTIFRAME = 'multiframeModule',
  NM_MULTIFRAME_GEOMETRY = 'nmMultiframeGeometryModule',
  OVERLAY_PLANE = 'overlayPlaneModule',
  PATIENT = 'patientModule',
  PATIENT_STUDY = 'patientStudyModule',
  PET_IMAGE = 'petImageModule',
  PET_ISOTOPE = 'petIsotopeModule',
  PET_SERIES = 'petSeriesModule',
  SOP_COMMON = 'sopCommonModule',
  ULTRASOUND_ENHANCED_REGION = 'ultrasoundEnhancedRegionModule',
  VOI_LUT = 'voiLutModule',
}
export function metaDataProvider(type: string, imageId: string) {
  const { scheme, url, frame, pixelDataFrame } = parseImageId(imageId);
  const dataSet = dataSetCacheManager.get(url);
  if (!dataSet) {
    return;
  }

  //   if (type === MetadataModules.GENERAL_STUDY) {
  //     return {
  //       studyDescription: dataSet.string('x00081030'),
  //       studyDate: bmParser.parseDA(dataSet.string('x00080020') || ''),
  //       studyTime: bmParser.parseTM(dataSet.string('x00080030') || ''),
  //       accessionNumber: dataSet.string('x00080050'),
  //     };
  //   }

  if (type === MetadataModules.GENERAL_SERIES) {
    return {
      modality: dataSet.string('x00080060') || 'CT',
      seriesInstanceUID: dataSet.string('x0020000e'),
      seriesNumber: dataSet.intString('x00200011'),
      studyInstanceUID: dataSet.string('x0020000d'),
      seriesDate: bmParser.parseDA(dataSet.string('x00080021') || ''),
      seriesTime: bmParser.parseTM(dataSet.string('x00080031') || ''),
      acquisitionDate: bmParser.parseDA(dataSet.string('x00080022') || ''),
      acquisitionTime: bmParser.parseTM(dataSet.string('x00080032') || ''),
    };
  }

  //   if (type === MetadataModules.GENERAL_IMAGE) {
  //     return {
  //       sopInstanceUID: dataSet.string('x00080018'),
  //       instanceNumber: dataSet.intString('x00200013'),
  //       lossyImageCompression: dataSet.string('x00282110'),
  //       lossyImageCompressionRatio: dataSet.floatString('x00282112'),
  //       lossyImageCompressionMethod: dataSet.string('x00282114'),
  //     };
  //   }

  //   if (type === MetadataModules.PATIENT) {
  //     return {
  //       patientID: dataSet.string('x00100020'),
  //       patientName: dataSet.string('x00100010'),
  //     };
  //   }

  //   if (type === MetadataModules.PATIENT_STUDY) {
  //     return {
  //       patientAge: dataSet.intString('x00101010'),
  //       patientSize: dataSet.floatString('x00101020'),
  //       patientSex: dataSet.string('x00100040'),
  //       patientWeight: dataSet.floatString('x00101030'),
  //     };
  //   }

  if (type === MetadataModules.IMAGE_PLANE) {
    const imageOrientationPatient = null; // extractOrientationFromDataset(dataSet);
    const imagePositionPatient = null; // = extractPositionFromDataset(dataSet);
    const pixelSpacing = null; //= extractSpacingFromDataset(dataSet);
    const sliceThickness = null; //= extractSliceThicknessFromDataset(dataSet);

    let columnPixelSpacing = null;

    let rowPixelSpacing = null;

    if (pixelSpacing) {
      rowPixelSpacing = pixelSpacing[0];
      columnPixelSpacing = pixelSpacing[1];
    }

    let rowCosines = null;

    let columnCosines = null;

    if (imageOrientationPatient) {
      rowCosines = [
        parseFloat(imageOrientationPatient[0]),
        parseFloat(imageOrientationPatient[1]),
        parseFloat(imageOrientationPatient[2]),
      ];
      columnCosines = [
        parseFloat(imageOrientationPatient[3]),
        parseFloat(imageOrientationPatient[4]),
        parseFloat(imageOrientationPatient[5]),
      ];
    }

    return {
      frameOfReferenceUID: dataSet.string('x00200052'),
      rows: dataSet.uint16('x00280010'),
      columns: dataSet.uint16('x00280011'),
      imageOrientationPatient,
      rowCosines,
      columnCosines,
      imagePositionPatient,
      sliceThickness,
      sliceLocation: dataSet.floatString('x00201041'),
      pixelSpacing,
      rowPixelSpacing,
      columnPixelSpacing,
    };
  }
  if (type === MetadataModules.CINE) {
    return {
      frameTime: dataSet.floatString('x00181063'),
    };
  }

  if (type === MetadataModules.IMAGE_PIXEL) {
    const imagePixelModule = {
      samplesPerPixel: dataSet.uint16('sampleOfPixel') || 1,
      photometricInterpretation: dataSet.string('x00280004') || 'MONOCHROME2',
      rows: dataSet.uint16('rows'),
      columns: dataSet.uint16('columns'),
      bitsAllocated: dataSet.uint16('x00280100') || 8,
      bitsStored: dataSet.uint16('x00280101') || 8,
      highBit: dataSet.uint16('x00280102') || 7,
      pixelRepresentation: dataSet.uint16('x00280103') || 0,
      planarConfiguration: dataSet.uint16('x00280006') || 1,
      pixelAspectRatio: dataSet.string('x00280034') || '2\\1',
    };
    return imagePixelModule;
  }
  return;
}
