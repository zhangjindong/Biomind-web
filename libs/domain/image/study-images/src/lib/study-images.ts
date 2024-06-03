export interface StudyImages {
  internalid: number;
  publicid: string;
  patient_id: string;
  patient_name: string;
  patient_age: string;
  patient_birth_date: string;
  patient_sex: string;
  patient_address: string;
  patient_telephone_numbers: string;
  institution_name: string;
  study_instance_uid: string;
  study_id: string;
  study_date: string;
  study_time: string;
  study_datetime: string;
  study_description: string;
  modalities: string;
  body_part_examined: string;
  accession_number: string;
  image_count: number;
  status: string;
  last_build_datetime: string;
  station_name: string;
  device_serial_number: string;
  manufacturer: string;
  bemerged_internalid: string;
  insertion_time: string;
  has_multi_frame: boolean;
  // seriess: Series[];
  series: Series[];
  data: {
    patientSize?: string;
    transFormat?: string;
    patientWeight?: string;
  };
}
export interface Series {
  internalid: number;
  publicid: string;
  study_instance_uid: string;
  series_instance_uid: string;
  series_number: string;
  modality: string;
  series_description: string;
  data: {
    seriesDate: string;
    seriesTime: string;
  };
  imageLength: number;
  middle_instance: Image;
  // no api
  loadImageType: string;
  imageIds: string[];
  instanceIds: string[];
  id: string;
  currentIndex: number;
  tags: Image[];
  study_publicid: string;
}

export interface Image {
  internalid?: number;
  publicid?: string;
  study_instance_uid?: string;
  series_instance_uid?: string;
  sop_class_uid?: string;
  sop_instance_uid?: string;
  instance_number?: number;
  image_type?: string;
  frame_of_reference_uid?: string;
  rows?: number;
  columns?: number;
  frames?: number;
  image_position_patient?: string;
  image_orientation_patient?: string;
  bits_allocated?: number;
  bits_stored?: number;
  high_bit?: number;
  photometric_interpretation?: string;
  pixel_representation?: number;
  pixel_spacing?: string;
  rescale_slope?: string;
  rescale_intercept?: string;
  window_center?: string;
  window_width?: string;
  transfer_syntax_uid?: string;
  slice_location?: string;
  slice_thickness?: string;
  data?: {
    cineRate?: string;
    frameTime?: string;
    bmFrameRate?: string;
    contentDate?: string;
    contentTime?: string;
    triggerTime?: string;
    acquisitionDate?: string;
    acquisitionTime?: string;
    spacingBetweenSlices?: string;
    SequenceOfUltrasoundRegions?: SequenceOfUltrasoundRegion[];
    recommendedDisplayFrameRate?: string;
  };
}
export interface SequenceOfUltrasoundRegion {
  RegionFlags?: string;
  PhysicalDeltaX?: string;
  PhysicalDeltaY?: string;
  RegionDataType?: string;
  RegionLocationMaxX1?: string;
  RegionLocationMaxY1?: string;
  RegionLocationMinX0?: string;
  RegionLocationMinY0?: string;
  RegionSpatialFormat?: string;
  PhysicalUnitsXDirection?: string;
  PhysicalUnitsYDirection?: string;
}

export interface StudyImagesRequest {
  study_instance_uid: string;
}
