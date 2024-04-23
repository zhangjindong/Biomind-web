/* eslint-disable-next-line */
import { useState } from 'react';
import bg from '../assets/image.png';
export interface LoginProps {
  onLogin: (username: string, password: string) => void;
  userinfo: any;
}
export function Login(props: LoginProps) {
  const { onLogin, userinfo } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div
      className={
        'relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'
      }
    >
      <img
        src={bg}
        alt=""
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        width="1920"
      />
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        {typeof userinfo !== 'object' && (
          <div className="sm:col-span-3">
            <div className="mt-2 text-red-400">{userinfo}</div>
          </div>
        )}
        <div className="sm:col-span-3">
          <div className="mt-2">
            <input
              data-testid="username"
              type="text"
              name="usernames"
              id="username"
              autoComplete="given-name"
              placeholder="账号"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <div className="mt-2">
            <input
              data-testid="password"
              type="password"
              name="password"
              id="password"
              autoComplete="given-name"
              placeholder="密码"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            data-testid="submit"
            type="button"
            onClick={() => onLogin(username, password)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
