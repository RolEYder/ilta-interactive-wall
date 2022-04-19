import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flowbite";
import App from "./App";
import "react-textarea-markdown-editor/build/TextareaMarkdownEditor.css";
import reportWebVitals from "./reportWebVitals";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
reportWebVitals();
