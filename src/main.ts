import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './registerServiceWorker';
import './app/styles.css';

const app = document.getElementById('app');

if (app) {
  createRoot(app).render(React.createElement(App));
}
