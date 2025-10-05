import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value);
  }
  
  // In production, you can send to your analytics service
  // Example: analytics.track('web-vitals', metric);
}

export function reportWebVitals() {
  onCLS(sendToAnalytics); // Cumulative Layout Shift
  onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
  onFCP(sendToAnalytics); // First Contentful Paint
  onLCP(sendToAnalytics); // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}
