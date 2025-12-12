import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ContextShare from "./ContextShareAPI/ContextShare";
import { ThemeContextProvider } from "./ContextShareAPI/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap ThemeContext first, then existing ContextShare */}
      <ThemeContextProvider>
        <ContextShare>
          <App />
        </ContextShare>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
