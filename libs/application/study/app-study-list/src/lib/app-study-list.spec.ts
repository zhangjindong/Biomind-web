import { spyOnObservable } from '@biomind-web/utils-test';
import { of } from 'rxjs';
import { describe, it } from 'vitest';

// vi.doMock('@biomind-web/api-user-info', () => ({
//   apiLogin: vi.fn(({ username, password, platform }) =>
//     of(
//       username !== 'test'
//         ? '用户名不存在'
//         : password !== '1'
//         ? '密码错误'
//         : testUser
//     )
//   ),
// }));
// useLogin 不能通过node环境进行测试，想要测试需要切换为jsdom环境；
const {
  filter$,
  onInitStudyList,
  onChangeAistatus,
  onChangePage,
  onChangeSearchColumn,
  onChangeSearchInput,
  onChangeSort,
  onChangeStudydatetime,
} = await import('./app-study-list');
describe('appStudyList --> filter/sort', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(filter$);
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：初始时发出空值', () => {
    onInitStudyList();
    console.log(latestEmission());

    expect(latestEmission()).toEqual({});
  });
});
