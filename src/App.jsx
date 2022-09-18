import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Add from './pages/Add';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Update from './pages/Update';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/add" element={<Add />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
