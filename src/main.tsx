
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import reportWebVitals, { enhancedReportWebVitals, initPerformanceMonitoring } from "./reportWebVitals";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a <div id='root'></div> in your HTML");
}

// Create root with concurrent features enabled
const root = createRoot(rootElement);

// Render with StrictMode for better development warnings and future compatibility
root.render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);

// Enhanced monitoring and web vitals - only in production
if (process.env.NODE_ENV === 'production') {
  enhancedReportWebVitals();
  initPerformanceMonitoring();
  reportWebVitals();
}
  