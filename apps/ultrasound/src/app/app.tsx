import { Route, Routes, Link } from 'react-router-dom';
import { Login } from '@biomind-web/login';
import { onLogin, onLogout, useUserNavigate } from '@biomind-web/app-user-info';

export function App() {
  const userinfo = useUserNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            This is the generated root route.
            <br />
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
            <button type="button" onClick={() => onLogout()}>
              登出
            </button>
            <br />
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
