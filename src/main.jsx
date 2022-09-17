/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import App from './App';
import Update from './pages/Update';
import EditContextProvider from './context/EditContext';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Modal from './pages/Modal';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <EditContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/add" element={<Add />} />
        <Route path="/about" element={<About />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </EditContextProvider>
  // </React.StrictMode>
);
