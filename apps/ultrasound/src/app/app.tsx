import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { Login } from '@biomind-web/login';
import { onLogin, onLogout, useUserNavigate } from '@biomind-web/app-user-info';
import { StudyHeader } from '@biomind-web/study-ui';

import { ImageViewer } from '@biomind-web/image-viewer';

export function App() {
  const userinfo = useUserNavigate();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="listViewer" />} />
      <Route
        path="/image-viewer"
        element={
          <div>
            <ImageViewer />
          </div>
        }
      />
      <Route
        path="/login"
        element={<Login onLogin={onLogin} userinfo={userinfo} />}
      />
      <Route
        path="/listViewer"
        element={
          <div>
            <StudyHeader />
          </div>
        }
      />
    </Routes>
  );
}
export default App;
