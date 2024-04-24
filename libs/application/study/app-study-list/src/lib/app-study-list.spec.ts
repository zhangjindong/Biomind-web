import {
  Filter,
  Page,
  Sort,
  StudyList,
  StudyListRequest,
} from '@biomind-web/study-info';
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

const getTestStudyListByAistatus = (
  testStudyList: StudyList,
  aistatus: string[]
) => {
  const result = {
    ...testStudyList,
    study_list: testStudyList.study_list?.filter(
      (study) => !!study?.aistatus && aistatus.includes(study.aistatus)
    ),
  };
  result.total = result.study_list?.length;
  return result;
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
    : key == 'aistatus'
    ? { ...defaultFilter, aistatus: args }
    : key == 'patient_info'
    ? { ...defaultFilter, patient_info: args }
    : defaultFilter;
// mock api
const apiStudyList = vi.fn((searchArgs: StudyListRequest) => {
  // studyDatetime为所有时返回值，否则返回空列表
  let list =
    Object.keys(searchArgs.filter?.studydatetime || {}).length == 0
      ? testStudyList
      : testStudyListEmpty;
  if (searchArgs.filter?.aistatus?.length !== 0)
    list = getTestStudyListByAistatus(list, searchArgs.filter?.aistatus || []);
  return of(list);
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
  studyList$,
} = await import('./app-study-list');

const aistatus_success = 'success';
const aistatus_failed = 'failed';
const aistatus_waiting = 'waiting';
const station_name = 'RUCP';

const column_name = ['patientname', 'patientsex'];

/**
 * aistatus 测试it
 * @param result  实际匹配：request结果值
 * @param aistatus
 * @param key
 */
function testAistatusIt(latestEmission: () => void, aistatus: string[]) {
  onChangeAistatus(aistatus);
  testIt(
    'filter',
    latestEmission(),
    getfilter(aistatus, 'aistatus'),
    getTestStudyListByAistatus(testStudyList, aistatus)
  );
}
/**
 * 测试it public
 * @param result 实际匹配：result结果值
 * @param filterEqual 期望匹配：filter值
 * @param resultEqual 期望匹配：result结果值
 */
function testIt(key: string, result: any, filterEqual: any, resultEqual: any) {
  const requests = apiStudyList.mock.lastCall;

  // 检查参数
  expect(requests?.length).not.toEqual(0);

  if (requests && requests?.length > 0) {
    const req: StudyListRequest = requests.at(0) || {};
    expect(req?.[key]).toEqual(filterEqual);
  }
  // 检查结果
  expect(result).toEqual(resultEqual);
}

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

describe('appStudyList --> filter/aistatus', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(studyList$);
  // 每次执行前，清空mock
  beforeAll(() => {
    apiStudyList.mockClear();
    onInitStudyList();
    onChangeStudydatetime('all');
  });
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：初始时发出所有的studylist 不为空值', () => {
    onChangeAistatus([]);
    testIt(
      'filter',
      latestEmission(),
      getfilter([], 'aistatus'),
      testStudyList
    );
  });
  it('应在：点击Sucess时发出1个成功的studylist', () => {
    testAistatusIt(latestEmission, [aistatus_success]);
  });
  it('应在：点击Failed时发出1个失败的studylist', () => {
    testAistatusIt(latestEmission, [aistatus_failed]);
  });
  it('应在：点击waiting时发出个空的studylist', () => {
    testAistatusIt(latestEmission, [aistatus_waiting]);
  });
});
describe('appStudyList --> Sort', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(studyList$);
  // 每次执行前，清空mock
  beforeAll(() => {
    apiStudyList.mockClear();
    onInitStudyList();
  });
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：点击Sort时，传入正确的请求参数', () => {
    const sortItem: Sort = { column_name: 'patientname', order: 'DESC' };
    onChangeSort(sortItem);
    testIt('sort', latestEmission(), sortItem, testStudyListEmpty);
  });
});
describe('appStudyList --> Page', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(studyList$);
  // 每次执行前，清空mock
  beforeAll(() => {
    apiStudyList.mockClear();
    onInitStudyList();
  });
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：点击page时，传入正确的请求参数', () => {
    const pageItem: Page = {
      row_limit_per_page: 1,
      page_number: 10,
    };
    onChangePage(pageItem);
    testIt('page', latestEmission(), pageItem, testStudyListEmpty);
  });
});
describe('appStudyList --> Search', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(studyList$);
  // 每次执行前，清空mock
  beforeAll(() => {
    apiStudyList.mockClear();
    onInitStudyList();
  });
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：仅仅点击SearchColumn时，不传入请求参数', () => {
    onChangeSearchInput('');
    const column_name: string[] = ['patientname', 'patientsex', 'patientid'];
    const value = '';
    const patient_info = { column_name, value };
    onChangeSearchColumn(column_name);
    const requests = apiStudyList.mock.lastCall;

    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter?.patient_info).toEqual(defaultFilter.patient_info);
      expect(req?.filter?.patient_info).not.toEqual(patient_info);
    }
    // 检查结果
    // expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：仅仅点SearchInput时，正确掺入请求参数', () => {
    onChangeSearchColumn([]);
    const column_name: string[] = [];
    const value = '瓣膜';
    const patient_info = { column_name, value };
    onChangeSearchInput(value);
    const requests = apiStudyList.mock.lastCall;

    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter?.patient_info).toEqual(patient_info);
    }
    // 检查结果
    // expect(latestEmission()).toEqual(testStudyListEmpty);
  });
  it('应在：点SearchInput 和 SearchColumn时，正确掺入请求参数', () => {
    const column_name: string[] = ['patientname', 'patientsex', 'patientid'];
    const value = '瓣膜';
    const patient_info = { column_name, value };
    onChangeSearchColumn(column_name);
    onChangeSearchInput(value);
    const requests = apiStudyList.mock.lastCall;

    // 检查参数
    expect(requests?.length).not.toEqual(0);

    if (requests && requests?.length > 0) {
      const req: StudyListRequest = requests.at(0) || {};
      expect(req?.filter?.patient_info).toEqual(patient_info);
    }
    // 检查结果
    // expect(latestEmission()).toEqual(testStudyListEmpty);
  });
});
