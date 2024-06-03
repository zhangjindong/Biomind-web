import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { from, map, of, switchMap, concatMap, reduce, merge, scan } from 'rxjs';
import { apiStudyImages } from '@biomind-web/api-study-image';
import { Image, Series, StudyImages } from '@biomind-web/study-images';
////////////////////////////1、//默认值及辅助函数////////////////////////
////////////////////////////2、//操作流////////////////////////////////
export const [ChangeStudyUid$, onChangeStudyUid] = createSignal(
  (changeStudyUid: string) => changeStudyUid
);

export const StudyInfo$ = ChangeStudyUid$.pipe(
  switchMap((studyUid) =>
    studyUid === ''
      ? of({} as StudyImages)
      : apiStudyImages({ study_instance_uid: studyUid })
  ),
  shareLatest()
);
export const SericesInfos$ = StudyInfo$.pipe(
  map((studyInfo) => {
    const { publicid: study_publicid, series } = studyInfo;
    return series.map((series) => ({ ...series, study_publicid }));
  }),
  concatMap((serices: Series[]) => from(serices)),
  map((serice) => {
    const {
      middle_instance,
      study_publicid,
      publicid: serice_publicid,
    } = serice;
    const { publicid, sop_instance_uid, frames } = middle_instance;
    const instancesFrames = new Array(frames)
      .fill('')
      .map((_, i) => `${sop_instance_uid}_${i}`);
    return {
      ...serice,
      instancesFrames,
      imageIds: instancesFrames.map(
        (instance, i) =>
          `bmweb:${
            window.location.origin
          }/bm/${study_publicid}/${serice_publicid}/${publicid + '_' + i}`
      ),
    };
  }),
  scan((acc, serice) => [...acc, serice], [] as Series[])
);
////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useStudyUid, StudyUid$] = bind(ChangeStudyUid$, '');
export const [useStudyImages, StudyImages$] = bind(
  StudyInfo$,
  {} as StudyImages
);
export const [useSericesInfo, SericesInfo$] = bind(
  SericesInfos$,
  [] as Series[]
);
////////////////////////////5、//订阅/////////////////////////////////
