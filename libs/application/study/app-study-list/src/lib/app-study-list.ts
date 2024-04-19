import {
  StudyList,
  StudyDateTime,
  Page,
  Sort,
  Filter,
} from '@biomind-web/study-info';
import { apiStudyList } from '@biomind-web/api-study';
import {
  combineKeys,
  createSignal,
  mergeWithKey,
  partitionByKey,
} from '@react-rxjs/utils';
import { map, scan } from 'rxjs';
/**
 * 首页首次打开
 */
export const [InitStudyList$, onInitStudyList] = createSignal();

/**
 * studydatetime 检查时间 过滤修改
 */
export const [ChangeStudydatetime$, onChangeStudydatetime] =
  createSignal<StudyDateTime>();

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
  init: InitStudyList$,
  studydatetime: ChangeStudydatetime$,
  aistatus: ChangeAistatus$,
  search: ChangeSearchInput$,
  searchColumn: ChangeSearchColumn$,
  page: ChangePage$,
  sort: ChangeSort$,
});

// 为每一个操作创建一个流
export const [filterMap, keyChanges$] = partitionByKey(
  filterActions$,
  (event) => event.type,
  (event$, key) =>
    event$.pipe(
      scan(
        (state, action) => {
          switch (action.type) {
            default:
              return state;
          }
        },
        <Filter>{
          patient_info: {
            column_name: [],
            value: '',
          },
          studydatetime: {},
          modality: [],
          aistatus: [],
          station_name: [],
        }
      )
    )
);
export const filter$ = combineKeys(keyChanges$, filterMap).pipe(
  map((filterMap) => [...filterMap.values()])
);
