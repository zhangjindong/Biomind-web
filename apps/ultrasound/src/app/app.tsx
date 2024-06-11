import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { StudyHeader } from '@biomind-web/study-ui';
import { Suspense, useEffect } from 'react';
import { LoginPage } from './login-page';
import { ImageViewerPage } from '@biomind-web/image-viewer';
import { StudyListPage } from '@biomind-web/study-list';
import { useUserNavigate } from '@biomind-web/app-user-info';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from 'antd';
import { Subscribe } from '@react-rxjs/core';

export function App() {
  const userinfo = useUserNavigate();
  const navigator = useNavigate();
  return (
    // 捕获 未处理异常
    <Alert.ErrorBoundary>
      {/* 捕获 并 处理异常消息 */}
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
          if (error.status === 403) {
            console.log('go to login');
            resetErrorBoundary();
            navigator('./login');
          }
          return (
            <Alert
              type="error"
              message="系统异常"
              description={error.message}
            ></Alert>
          );
        }}
      >
        {/* 全局自动订阅 react-rxjs */}
        <Subscribe>
          {/* Suspense */}
          <Suspense fallback={'Loadding ... '}>
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
                    <ImageViewerPage />
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </Subscribe>
      </ErrorBoundary>
    </Alert.ErrorBoundary>
  );
}
export default App;
