
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import reportWebVitals, { enhancedReportWebVitals, initPerformanceMonitoring } from "./reportWebVitals";
  import { Analytics } from '@vercel/analytics/react';
  import { SpeedInsights } from '@vercel/speed-insights/react';

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <Analytics />
      <SpeedInsights />
    </>
  );

  // Enhanced monitoring and web vitals
  enhancedReportWebVitals();
  initPerformanceMonitoring();
  
  // Fallback for basic monitoring
  reportWebVitals();
  