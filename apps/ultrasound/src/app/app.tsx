import { Route, Routes, Navigate } from 'react-router-dom';
import { StudyHeader } from '@biomind-web/study-ui';
import { Suspense, useEffect } from 'react';
import { LoginPage } from './login-page';
import { ImageViewerPage } from '@biomind-web/image-viewer';
import { StudyListPage } from '@biomind-web/study-list';
import { useUserNavigate } from '@biomind-web/app-user-info';

export function App() {
  const userinfo = useUserNavigate();
  useEffect(() => {
    console.log('app', userinfo);
  }, [userinfo]);
  console.log('userinfo => ', userinfo);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="listViewer" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/listViewer"
        element={
          <div>
            <StudyHeader />
            <StudyListPage />
          </div>
        }
      />
      <Route
        path="/imageViewer"
        element={
          <div>
            <Suspense fallback={'Loadding...'}>
              <ImageViewerPage />
            </Suspense>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
