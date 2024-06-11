import { apiLogin } from '@biomind-web/api-user-info';
import { UserInfo } from '@biomind-web/user-info';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  switchMap,
  startWith,
  of,
  mergeWith,
  tap,
  map,
  connectable,
} from 'rxjs';

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
export const [logoutUser$, onLogout] = createSignal();

// 实现登录
const login$ = loginUser$.pipe(
  tap((e) => {
    // console.log('======------===', e);
  }),
  switchMap(({ username, password }) =>
    username == ''
      ? of('用户名不能为空')
      : password == ''
      ? of('密码不能为空')
      : apiLogin({
          username,
          password,
          platform: import.meta.env['VITE_APP_PLATFORM'],
        })
  ),
  startWith(<UserInfo>JSON.parse(localStorage.getItem('UserInfo') || '{}'))
);
// 实现登出
const logout$ = logoutUser$.pipe(map(() => <UserInfo>{}));
// 出口处
// 合并登录登出，输出当前用户信息
export const [useUserInfo, userInfo$] = bind(
  login$.pipe(
    tap((e) => {
      // console.log('======------', e);
    }),
    mergeWith(logout$)
  ),
  {}
);

/**
 * 控制登录后跳转路由
 * 控制刷新
 * @returns userinfo
 */
export function useUserNavigate() {
  const userinfo = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // console.log('useUserNavigate() called', userinfo);

    if (typeof userinfo !== 'string' && !!userinfo?.userid) {
      location.pathname == '/login' && navigate('/');
    } else {
      navigate('/login');
    }
  }, [userinfo]);
  return userinfo;
}
// 全局订阅
userInfo$
  .pipe(
    tap((userinfo) =>
      localStorage.setItem('UserInfo', JSON.stringify(userinfo))
    )
  )
  .subscribe();
