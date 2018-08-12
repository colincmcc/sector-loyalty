// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root,
  );
}
registerServiceWorker();
