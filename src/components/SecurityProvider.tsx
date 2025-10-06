import React, { useEffect } from 'react';
import { getCSPDirectives, logSecurityEvent } from '../utils/security';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  useEffect(() => {
    // Apply CSP meta tag dynamically (for development)
    if (process.env.NODE_ENV === 'development') {
      const cspDirectives = getCSPDirectives();
      const cspString = Object.entries(cspDirectives)
        .map(([key, values]) => {
          const valueString = Array.isArray(values) ? values.join(' ') : values;
          return `${key} ${valueString}`;
        })
        .join('; ');

      let metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Security-Policy';
        document.head.appendChild(metaTag);
      }
      metaTag.content = cspString;
    }

    // Log page load
    logSecurityEvent({
      type: 'login',
      ip: 'client-side',
      userAgent: navigator.userAgent,
      details: { page: window.location.pathname }
    });

    // Prevent right-click in production (optional - can be removed if too restrictive)
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Prevent F12 and other dev tools shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Monitor for console tampering
    if (process.env.NODE_ENV === 'production') {
      const originalConsole = { ...console };
      console.warn = (...args) => {
        logSecurityEvent({
          type: 'failed_auth',
          details: { consoleWarning: args }
        });
        originalConsole.warn(...args);
      };
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}

// Hook for security-aware components
export function useSecurityMonitoring() {
  const logEvent = (type: Parameters<typeof logSecurityEvent>[0]['type'], details?: any) => {
    logSecurityEvent({
      type,
      ip: 'client-side',
      userAgent: navigator.userAgent,
      details
    });
  };

  const checkRateLimit = (identifier: string, limit: number, windowMs: number) => {
    // Client-side rate limiting is advisory only
    // Real rate limiting should be server-side
    const key = `rateLimit_${identifier}`;
    const now = Date.now();
    const requests = JSON.parse(localStorage.getItem(key) || '[]');
    
    const validRequests = requests.filter((time: number) => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      logEvent('rate_limit', { identifier, limit, window: windowMs });
      return false;
    }
    
    validRequests.push(now);
    localStorage.setItem(key, JSON.stringify(validRequests));
    return true;
  };

  return {
    logEvent,
    checkRateLimit
  };
}