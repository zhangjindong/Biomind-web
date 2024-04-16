import { spyOnObservable } from '@biomind-web/utils-test';
import { of } from 'rxjs';
import { describe, it } from 'vitest';

const testUser = {
  username: 'test',
  permissions: ['admin'],
  access_token: 'token',
};

vi.doMock('@biomind-web/api-user-info', () => ({
  apiLogin: vi.fn((username, password) =>
    of(
      username !== 'test'
        ? '用户名不存在'
        : password !== '1'
        ? '密码错误'
        : testUser
    )
  ),
}));
// useLogin 不能通过node环境进行测试，想要测试需要切换为jsdom环境；
const { onLogin, userInfo$, onLogout } = await import('./app-user-info');
describe('appUserInfo --> onLogin, onLogout', () => {
  // 对login$进行订阅，以确保流是否执行
  const { latestEmission, subscription } = spyOnObservable(userInfo$);
  // 确保我们在完成订阅时取消订阅，以避免内存泄漏
  afterAll(() => {
    subscription.unsubscribe();
  });
  it('应在：初始时发出空值', () => {
    expect(latestEmission()).toEqual({});
  });

  it('应在：登录错误时返回正确的错误信息 用户名不能为空', () => {
    onLogin('', '');
    expect(latestEmission()).toEqual('用户名不能为空');
  });
  it('应在：登录错误时返回正确的错误信息 密码不能为空', () => {
    onLogin('test', '');
    expect(latestEmission()).toEqual('密码不能为空');
  });
  it('应在：登录错误时返回正确的错误信息 用户名不存在', () => {
    onLogin('test2', '1');
    expect(latestEmission()).toEqual('用户名不存在');
  });
  it('应在：登录错误时返回正确的错误信息 密码错误', () => {
    onLogin('test', '2');
    expect(latestEmission()).toEqual('密码错误');
  });

  it('应在：登录成功时返回正确的用户信息', () => {
    onLogin('test', '1');
    expect(latestEmission()).toEqual(testUser);
  });

  it('应在：登出时发出空值', () => {
    onLogin('test', '1');
    onLogout('test');
    expect(latestEmission()).not.toEqual(testUser);
    expect(latestEmission()).toEqual({});
  });
});
