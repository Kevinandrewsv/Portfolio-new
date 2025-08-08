import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ← import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>      {/* ← wrap your App */}
      <Toaster />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
