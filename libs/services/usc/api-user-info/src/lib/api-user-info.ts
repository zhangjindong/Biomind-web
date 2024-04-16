import { UserInfo } from '@biomind-web/user-info';
import { catchError, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
export function apiUserInfo(): string {
  return 'api-user-info';
}
/**
 * API 登录
 * @param username 用户名
 * @param password 密码
 * @param platform 平台
 */
export const apiLogin = (
  username: string,
  password: string,
  platform: string
) =>
  ajax
    .post<UserInfo | string>(`/oauth/login-v2`, {
      username,
      password,
      platform,
    })
    .pipe(
      map((response) => console.log(response)),
      catchError((error) => {
        return of(error);
      })
    );
