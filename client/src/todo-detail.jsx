import React from "react";
import { createRoot } from "react-dom/client";
import TodoDetail from "./pages/TodoDetail";
import "./styles/app.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoDetail />
  </React.StrictMode>
);
