import { LoginRequest, UserInfo } from '@biomind-web/user-info';
import * as md5 from 'md5';
import { CreateAPIMethod } from '@biomind-web/utils';


/**
 * API 登录
 * @param username 用户名
 * @param password 密码
 * @param platform 平台
 */
export const apiLogin = CreateAPIMethod<LoginRequest, UserInfo | string>(
  { method: 'POST', url: '/oauth/login-v2' },
  (input) => ({
    ...input,
    password: md5(input.username + input.password),
  })
);
