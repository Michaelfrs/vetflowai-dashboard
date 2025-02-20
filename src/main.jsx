import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/App.css";  // Ensure this path matches your project structure
import "./styles/index.css"; // If using index.css, import it here

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
