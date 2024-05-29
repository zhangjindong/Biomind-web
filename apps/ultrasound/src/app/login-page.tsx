/* eslint-disable-next-line */
import { onLogin, useUserInfo } from '@biomind-web/app-user-info';
import { Login } from '@biomind-web/login';
export function LoginPage() {
  const userinfo = useUserInfo();
  return <Login onLogin={onLogin} userinfo={userinfo} />;
}
