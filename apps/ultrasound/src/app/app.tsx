import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '@biomind-web/login';
import { onLogin, useUserNavigate } from '@biomind-web/app-user-info';
import { StudyHeader } from '@biomind-web/study-ui';

import { ImageViewer } from '@biomind-web/image-viewer';
import { Suspense } from 'react';
import {
  initCornerstone,
  onChangeRenderingEngineId,
} from '@biomind-web/app-image-viewer';
import { useAsyncEffect } from 'ahooks';

export function App() {
  const userinfo = useUserNavigate();

  // useAsyncEffect(async () => {
  //   await initCornerstone();
  //   onChangeRenderingEngineId();
  //   // return () => re?.destroy();
  //   console.log('===app.tsx');
  // }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="listViewer" />} />
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
      <Route
        path="/imageViewer"
        element={
          <div>
            <Suspense fallback={'Loadding...'}>
              <ImageViewer />
            </Suspense>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
