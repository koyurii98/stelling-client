import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/Index.css'
import { AppProvider } from './context/index';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
