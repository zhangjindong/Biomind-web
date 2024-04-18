import { apiLogin } from '@biomind-web/api-user-info';
import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { switchMap, startWith, of, mapTo, mergeWith } from 'rxjs';

/**
 * 入口处
 * 登录func
 * @param username 用户名
 * @param password 密码
 */
export const [loginUser$, onLogin] = createSignal(
  (username: string, password: string) => ({ username, password })
);

/**
 * 入口处
 * 登出func
 * @param username 用户名
 */
export const [logoutUser$, onLogout] = createSignal((username: string) => ({
  username,
}));

// 实现登录
const login$ = loginUser$.pipe(
  switchMap(({ username, password }) =>
    username == ''
      ? of('用户名不能为空')
      : password == ''
      ? of('密码不能为空')
      : apiLogin(username, password, import.meta.env.VITE_APP_PLATFORM)
  ),
  startWith({})
);
// 实现登出
const logout$ = logoutUser$.pipe(mapTo({}));
// 出口处
// 合并登录登出，输出当前用户信息
export const [useUserInfo, userInfo$] = bind(login$.pipe(mergeWith(logout$)));
userInfo$.subscribe();
