import { Route, Routes, Link } from 'react-router-dom';

import { Login } from '@biomind-web/login';
import { onLogin, useUserInfo, userInfo$ } from '@biomind-web/app-user-info';
import { useEffect } from 'react';
export function App() {
  const userinfo = useUserInfo();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        }
      />
      <Route
        path="/login"
        element={<Login onLogin={onLogin} userinfo={userinfo} />}
      />
      <Route
        path="/page-2"
        element={
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
