import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/reset.css';
import './style/fonts.css';
import './style/index.scss';
import './style/typography.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
