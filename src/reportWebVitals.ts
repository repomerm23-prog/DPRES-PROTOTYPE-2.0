import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Types for better TypeScript support
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

// Enhanced monitoring with automatic Vercel Analytics integration
export const enhancedReportWebVitals = () => {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    reportWebVitals((metric) => {
      console.log('🔍 Web Vitals:', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        delta: metric.delta,
        timestamp: new Date().toISOString()
      });
    });
  }

  // Production analytics
  if (process.env.NODE_ENV === 'production') {
    // Send to Vercel Analytics
    reportWebVitals((metric) => {
      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vital', {
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Send to custom analytics if needed
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'web-vital',
          name: metric.name,
          value: metric.value,
          id: metric.id,
          rating: metric.rating,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silently fail for analytics
      });
    });
  }
};

// Performance observer for additional metrics
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if ((entry as any).duration > 50) {
            console.warn('⚠️ Long Task detected:', {
              duration: (entry as any).duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Observer not supported
    }

    // Monitor layout shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (layoutShiftEntry.hadRecentInput) continue;
          console.log('📏 Layout Shift:', {
            value: layoutShiftEntry.value,
            sources: layoutShiftEntry.sources?.map((source: any) => ({
              node: source.node,
              previousRect: source.previousRect,
              currentRect: source.currentRect,
            })),
          });
        }
      });
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Observer not supported
    }
  }

  // Monitor memory usage (Chrome only)
  if ('memory' in (performance as any)) {
    const memoryInfo = (performance as any).memory;
    if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) {
      console.warn('⚠️ High memory usage detected:', {
        used: memoryInfo.usedJSHeapSize,
        total: memoryInfo.totalJSHeapSize,
        limit: memoryInfo.jsHeapSizeLimit,
      });
    }
  }
};

export default reportWebVitals;
