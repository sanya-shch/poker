import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import ToastProvider from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <ToastProvider>
      <HashRouter>
        {/*<React.StrictMode>*/}
        <App />
        {/*</React.StrictMode>*/}
      </HashRouter>
    </ToastProvider>
  </ErrorBoundary>
);
