import { apiUserColumns } from '@biomind-web/api-study';
import { userInfo$ } from '@biomind-web/app-user-info';
import { UserInfo } from '@biomind-web/user-info';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { filter, map, switchMap, tap } from 'rxjs';
////////////////////////////////  1、//默认值及辅助函数//////////////////////////////////
export const ALL_COLUMNS = [
  'patientid',
  'patientname',
  'patientsex',
  'studydatetime',
  'modality',
  'bodypartexamined',
  'studyinstanceuid',
  'accessionnumber',
  'stationname',
  'inserttime',
  'starttime',
  'completiontime',
  'diagnosis',
  'imagecount',
  'patientage',
  'lastbuilddatetime',
];

////////////////////////////////  2、//操作流////////////////////////////////
/**
 * 首页首次打开
 */
export const [InitUserSetting$, onInitUserSetting] = createSignal();
////////////////////////////////  3、//合并所有操作流//////////////////////////////
export const UserConfigColumns$ = userInfo$.pipe(
  filter((ui) => typeof ui !== 'string'),
  map((userinfo) => userinfo as UserInfo),
  switchMap((userinfo: UserInfo) =>
    apiUserColumns({ user_id: userinfo?.userid || '' })
  ),
  map((x) => x?.settings),
  tap(() => {
    // console.log('090000000');
  }),
  shareLatest()
);
////////////////////////////////  4、//绑定流，释放hooks函数、触发API////////////
export const [useUserColumns, userColumns$] = bind(UserConfigColumns$, {
  msgCode: '',
  sort_columns: {},
  select_columns: [],
});
////////////////////////////////  5、//订阅////////////////////////
