import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
// import { connect } from '@rxjs-insights/devtools/connect';

import App from './app/app';

import { BrowserRouter } from 'react-router-dom';
import { Subscribe } from '@react-rxjs/core';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Subscribe>
        <App />
      </Subscribe>
    </BrowserRouter>
  </StrictMode>
);
