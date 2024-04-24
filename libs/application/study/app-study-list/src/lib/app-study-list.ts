import {
  StudyDateTime,
  Page,
  Sort,
  Filter,
  StudyListRequest,
} from '@biomind-web/study-info';
import { apiStudyList } from '@biomind-web/api-study';
import { createSignal, mergeWithKey } from '@react-rxjs/utils';
import { combineLatestWith, map, scan, startWith, switchMap } from 'rxjs';
import { bind } from '@react-rxjs/core';
import { toDoubleDigit } from '@biomind-web/utils';

////////////////////////////1、//默认值及辅助函数//////////////////////////////////
// 默认过滤
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
// 默认请求
const defaultStudyListRequest: StudyListRequest = {
  diagnosis_lang: 'cn',
  filter: defaultFilter,
  page: { row_limit_per_page: 30, page_number: 1 },
  sort: { column_name: 'studydatetime', order: 'DESC' },
  user_id: '',
  predictor: '',
};

/**
 * 获取当前时间
 * @param payload tody,3tody,7tody,1month,all,{start_time,end_time}
 * @returns
 */
const getStudyDateTimeNow = (
  payload: string | StudyDateTime
): StudyDateTime => {
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
      : typeof payload != 'string'
      ? payload
      : {})
  );
};

//////////////////////////////2、//操作流////////////////////////////////
/**
 * 首页首次打开
 */
export const [InitStudyList$, onInitStudyList] = createSignal();

/**
 * studydatetime 检查时间 过滤修改
 */
export const [ChangeStudydatetime$, onChangeStudydatetime] = createSignal(
  (payload: StudyDateTime | string) => getStudyDateTimeNow(payload)
);

/**
 * aistatus 预测状态 过滤修改
 */
export const [ChangeAistatus$, onChangeAistatus] = createSignal<string[]>();

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

////////////////////////////////3、//合并所有操作流//////////////////////////////

// 合并所有流为 key payload 模式
export const filterActions$ = mergeWithKey({
  init: InitStudyList$.pipe(startWith(defaultStudyListRequest)),
  studydatetime: ChangeStudydatetime$.pipe(
    startWith(getStudyDateTimeNow('tody'))
  ),
  aistatus: ChangeAistatus$.pipe(startWith([])),
  search: ChangeSearchInput$.pipe(
    startWith(''),
    combineLatestWith(ChangeSearchColumn$.pipe(startWith([]))),
    map(([value, column_name]) => ({
      value,
      column_name: value != '' ? column_name : [],
    }))
  ),
  // searchColumn: ChangeSearchColumn$.pipe(startWith([])),
  page: ChangePage$.pipe(startWith(defaultStudyListRequest.page)),
  sort: ChangeSort$.pipe(startWith(defaultStudyListRequest.sort)),
});
// 处理操作逻辑,合并为一个值
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
        case 'search':
          return {
            ...state,
            filter: { ...state.filter, patient_info: action.payload },
          };
      }
    }
    return state;
  }, defaultStudyListRequest)
);

///////////////////////////////////4、//绑定流，释放hooks函数、触发API///////////////////////////////////////////////////////////
export const [useStudyList, studyList$] = bind(
  studyListRequest$.pipe(switchMap(apiStudyList))
);

///////////////////////////////////5、//订阅////////////////////////
studyList$.subscribe();
