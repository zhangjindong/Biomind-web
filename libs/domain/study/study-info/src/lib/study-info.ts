export function studyInfo(): string {
  return 'study-info';
}

export interface Page {
  row_limit_per_page?: number;
  page_number?: number;
}

export interface Sort {
  column_name?: string;
  order?: string;
}

export interface StudyDateTime {
  start_time?: string;
  end_time?: string;
}

export interface Filter {
  patient_info?: {
    column_name: Array<string>;
    value: string;
  };
  studydatetime?: StudyDateTime;
  modality?: Array<any>;
  aistatus?: Array<string>;
  station_name?: Array<any>;
}

export interface StudyListRequest {
  diagnosis_lang?: string;
  filter?: Filter;
  page?: Page;
  sort?: Sort;
  user_id?: string;
  predictor?: string;
}

export interface StudyList extends Page {
  total?: number;
  study_list?: Array<StudyInfoBasic>;
}

/**
 * ListViewer study list basic info
 */
export interface StudyInfoBasic {
  internalid?: number;
  patientid?: string;
  patientname?: string;
  patientsex?: string;
  modality?: string;
  bodypartexamined?: string;
  studyinstanceuid?: string;
  accessionnumber?: string;
  studydatetime?: string;
  starttime?: string;
  inserttime?: string;
  completiontime?: string;
  stationname?: string;
  imagecount?: number;
  patientage?: string;
  is_edit?: false | null;
  aistatus?: string;
  publicid?: string;
  status_info?: Array<any>;
  lastbuilddatetime?: string;
  exam_find?: null | string;
  us_tip?: null | string;
}
