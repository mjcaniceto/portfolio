import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SoundProvider } from "./hooks/SoundContext.jsx"; // Import SoundProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap App in SoundProvider so any section can play sound effects */}
      <SoundProvider>
        <App />
      </SoundProvider>
    </BrowserRouter>
  </React.StrictMode>
);