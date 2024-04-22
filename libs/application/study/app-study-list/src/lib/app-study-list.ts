import {
  StudyList,
  StudyDateTime,
  Page,
  Sort,
  Filter,
  StudyListRequest,
} from '@biomind-web/study-info';
import { apiStudyList } from '@biomind-web/api-study';
import {
  combineKeys,
  createSignal,
  mergeWithKey,
  partitionByKey,
} from '@react-rxjs/utils';
import { map, scan, startWith, switchMap } from 'rxjs';
import { bind } from '@react-rxjs/core';
import { toDoubleDigit } from '@biomind-web/utils';

const defaultFilter: Filter = {
  patient_info: {
    column_name: [],
    value: '',
  },
  studydatetime: {},
  modality: [],
  aistatus: [],
  station_name: [],
};

const getfilter = (args: any, key: string): Filter =>
  key == 'studydatetime'
    ? { ...defaultFilter, studydatetime: args }
    : defaultFilter;
const defaultStudyListRequest: StudyListRequest = {
  diagnosis_lang: 'cn',
  filter: defaultFilter,
  page: { row_limit_per_page: 30, page_number: 1 },
  sort: { column_name: 'studydatetime', order: 'DESC' },
  user_id: '',
  predictor: '',
};

const getStudyDateTime = (payload: string | StudyDateTime): StudyDateTime => {
  const [year, month, day] = new Date(Date.now())
    .toISOString()
    .slice(0, 10)
    .split('-');
  const start_time_tody = `${year}-${month}-${day} 00:00:00`;
  const end_time_tody = `${year}-${month}-${day} 23:59:59`;
  const start_time_3tody = `${year}-${month}-${toDoubleDigit(
    Number(day) - 3
  )} 00:00:00`;
  const end_time_3tody = `${year}-${month}-${day} 23:59:59`;

  const start_time_7tody = `${year}-${month}-${toDoubleDigit(
    Number(day) - 7
  )} 00:00:00`;
  const end_time_7tody = `${year}-${month}-${day} 23:59:59`;
  const start_time_1month = `${year}-${toDoubleDigit(
    Number(month) - 1
  )}-${day} 00:00:00`;
  const end_time_1month = `${year}-${month}-${day} 23:59:59`;

  return <StudyDateTime>(
    (payload == 'tody'
      ? { start_time: start_time_tody, end_time: end_time_tody }
      : payload == '3tody'
      ? { start_time: start_time_3tody, end_time: end_time_3tody }
      : payload == '7tody'
      ? { start_time: start_time_7tody, end_time: end_time_7tody }
      : payload == '1month'
      ? { start_time: start_time_1month, end_time: end_time_1month }
      : payload == 'all'
      ? {}
      : {})
  );
};

/**
 * 首页首次打开
 */
export const [InitStudyList$, onInitStudyList] = createSignal();

/**
 * studydatetime 检查时间 过滤修改
 */
export const [ChangeStudydatetime$, onChangeStudydatetime] = createSignal(
  (payload: StudyDateTime | string) => getStudyDateTime(payload)
);

/**
 * aistatus 预测状态 过滤修改
 */
export const [ChangeAistatus$, onChangeAistatus] = createSignal();

/**
 * SearchValue 查询条件  过滤修改
 */
export const [ChangeSearchInput$, onChangeSearchInput] = createSignal<string>();

/**
 * SearchColumn 查询对应的key 过滤想修改
 */
export const [ChangeSearchColumn$, onChangeSearchColumn] =
  createSignal<Array<string>>();

/**
 * Page 页数修改
 */
export const [ChangePage$, onChangePage] = createSignal<Page>();

/**
 * Sort 排序修改
 */
export const [ChangeSort$, onChangeSort] = createSignal<Sort>();

// 合并所有流
export const filterActions$ = mergeWithKey({
  init: InitStudyList$.pipe(startWith(defaultStudyListRequest)),
  studydatetime: ChangeStudydatetime$.pipe(startWith(getStudyDateTime('tody'))),
  aistatus: ChangeAistatus$.pipe(startWith([])),
  search: ChangeSearchInput$.pipe(startWith('')),
  searchColumn: ChangeSearchColumn$.pipe(startWith([])),
  page: ChangePage$.pipe(startWith(defaultStudyListRequest.page)),
  sort: ChangeSort$.pipe(startWith(defaultStudyListRequest.sort)),
});
export const studyListRequest$ = filterActions$.pipe(
  scan((state, action) => {
    if (action.payload) {
      switch (action.type) {
        case 'init':
          return state;
        case 'studydatetime':
          return {
            ...state,
            filter: { ...state.filter, studydatetime: action.payload },
          };
        case 'aistatus':
          return {
            ...state,
            filter: { ...state.filter, aistatus: action.payload },
          };
        case 'page':
          return {
            ...state,
            page: action.payload,
          };
        case 'sort':
          return {
            ...state,
            sort: action.payload,
          };
      }
    }
    return state;
  }, defaultStudyListRequest)
);
export const [useStudyList, studyList$] = bind(
  studyListRequest$.pipe(switchMap(apiStudyList))
);
// 为每一个操作创建一个流
// export const [filterMap, keyChanges$] = partitionByKey(
//   filterActions$,
//   (event) => event.type,
//   (event$, key) =>
//     event$.pipe(
//       scan((state, action) => {
//         console.log(action, state);
//         if (action.payload) {
//           switch (action.type) {
//             case 'init':
//               return state;
//             case 'studydatetime':
//               return {
//                 ...state,
//                 filter: { ...state.filter, studydatetime: action.payload },
//               };
//             case 'aistatus':
//               return {
//                 ...state,
//                 filter: { ...state.filter, aistatus: action.payload },
//               };
//             case 'page':
//               return {
//                 ...state,
//                 page: action.payload,
//               };
//             case 'sort':
//               return {
//                 ...state,
//                 sort: action.payload,
//               };
//           }
//         }
//         return state;
//       }, defaultStudyListRequest)
//     )
// );
// export const filter$ = combineKeys(keyChanges$, filterMap).pipe(
//   map((filterMap) => [...filterMap.values()])
// );
