import React from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./pages/TodoList";
import "./styles/app.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);
