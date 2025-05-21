import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PrivyProvider from "./components/PrivyProvider";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Get basename from environment
const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>
);
