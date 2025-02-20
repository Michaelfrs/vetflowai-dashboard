import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/App.css"; // Ensure correct CSS import
import App from "./App";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
