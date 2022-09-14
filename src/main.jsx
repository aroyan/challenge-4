import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Update from "./pages/Update";
import EditContextProvider from "./context/EditContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <EditContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/update" element={<Update />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  </EditContextProvider>
  // </React.StrictMode>
);
