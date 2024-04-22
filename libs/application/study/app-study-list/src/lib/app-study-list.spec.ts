import { Filter, StudyList, StudyListRequest } from '@biomind-web/study-info';
import { toDoubleDigit } from '@biomind-web/utils';
import { spyOnObservable } from '@biomind-web/utils-test';
import { of } from 'rxjs';
import { describe, it } from 'vitest';

const testStudyListEmpty: StudyList = {
  total: 0,
  row_limit_per_page: 30,
  page_number: 1,
  study_list: [],
};
const testStudyList: StudyList = {
  total: 143,
  row_limit_per_page: 30,
  page_number: 1,
  study_list: [
    {
      internalid: 2150,
      patientid: '20230922005',
      patientname: '心脏数据',
      patientsex: 'O',
      modality: 'US',
      bodypartexamined: '',
      studyinstanceuid: '',
      accessionnumber: '1',
      studydatetime: '2023-09-22 16:20:23',
      starttime: '2024-04-18 11:50:33',
      inserttime: '2024-04-18 11:00:12',
      completiontime: '2024-04-18 11:50:39',
      stationname: 'RUCP',
      imagecount: 1,
      patientage: '',
      is_edit: null,
      aistatus: 'failed',
      publicid: '',
      status_info: [],
      lastbuilddatetime: '2024-04-03 21:20:53',
      exam_find: null,
      us_tip: null,
    },
    {
      internalid: 17,
      patientid: '20230918000',
      patientname: '心脏',
      patientsex: 'O',
      modality: 'US',
      bodypartexamined: '',
      studyinstanceuid: '',
      accessionnumber: '1',
      studydatetime: '2023-09-18 16:56:29',
      starttime: '2024-04-18 11:00:09',
      inserttime: '2024-04-18 11:00:08',
      completiontime: '2024-04-18 11:03:11',
      stationname: 'RUCP',
      imagecount: 25,
      patientage: '',
      is_edit: false,
      aistatus: 'success',
      publicid: '',
      status_info: [],
      lastbuilddatetime: '2024-03-27 02:31:54',
      exam_find: null,
      us_tip: null,
    },
  ],
};

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
// mock api
const apiStudyList = vi.fn((searchArgs: StudyListRequest) => {
  // studyDatetime为所有时返回值，否则返回空列表
  return Object.keys(searchArgs.filter?.studydatetime || {}).length == 0
    ? of(testStudyList)
    : of(testStudyListEmpty);
});
vi.doMock('@biomind-web/api-study', () => ({
  apiStudyList,
}));

// useLogin 不能通过node环境进行测试，想要测试需要切换为jsdom环境；
const {
  // filter$,
  onInitStudyList,
  onChangeAistatus,
  onChangePage,
  onChangeSearchColumn,
  onChangeSearchInput,
  onChangeSort,
  onChangeStudydatetime,
  filterActions$,
  studyListRequest$,
  studyList$,
} = await import('./app-study-list');

const aistatus_success = 'success';
const aistatus_failed = 'failed';
const aistatus_waiting = 'waiting';
const station_name = 'RUCP';

const column_name = ['patientname', 'patientsex'];

describe('appStudyList --> filter/studydatetime', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(studyList$);
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
  // 每次执行前，清空mock
  beforeAll(() => {
    apiStudyList.mockClear();
    onInitStudyList();
  });
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：初始时发出今天的studylist空值', () => {
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.sort).toEqual({
        column_name: 'studydatetime',
        order: 'DESC',
      });
      expect(req?.page).toEqual({ row_limit_per_page: 30, page_number: 1 });
      expect(req?.filter).toEqual(
        getfilter(
          { start_time: start_time_tody, end_time: end_time_tody },
          'studydatetime'
        )
      );
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点击今天时 studylist空值', () => {
    onChangeStudydatetime('tody');
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter).toEqual(
        getfilter(
          { start_time: start_time_tody, end_time: end_time_tody },
          'studydatetime'
        )
      );
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点击3天时 studylist空值', () => {
    onChangeStudydatetime('3tody');
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter).toEqual(
        getfilter(
          { start_time: start_time_3tody, end_time: end_time_3tody },
          'studydatetime'
        )
      );
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点击7天时 studylist空值', () => {
    onChangeStudydatetime('7tody');
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter).toEqual(
        getfilter(
          { start_time: start_time_7tody, end_time: end_time_7tody },
          'studydatetime'
        )
      );
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点击1个月时 studylist空值', () => {
    onChangeStudydatetime('1month');
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter).toEqual(
        getfilter(
          { start_time: start_time_1month, end_time: end_time_1month },
          'studydatetime'
        )
      );
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点击所有时 studylist 不为空值', () => {
    onChangeStudydatetime('all');
    const requests = apiStudyList.mock.lastCall;
    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter).toEqual(getfilter({}, ''));
    }
    // 检查结果
    expect(latestEmission()).toEqual(testStudyList);
  });
});
