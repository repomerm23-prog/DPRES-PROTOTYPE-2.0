
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { reportWebVitals } from "./reportWebVitals";

  createRoot(document.getElementById("root")!).render(<App />);

  // Monitor web vitals
  reportWebVitals();
  