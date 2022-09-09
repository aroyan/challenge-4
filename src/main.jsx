import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Add from "./pages/Add";
import Update from "./pages/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/update" element={<Update />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
