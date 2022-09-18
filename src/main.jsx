/* eslint-disable comma-dangle */
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import EditContextProvider from './context/EditContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EditContextProvider>
  </React.StrictMode>
);
