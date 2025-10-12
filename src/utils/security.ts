// Security utilities for the disaster preparedness platform
import { z } from 'zod';

// Input validation schemas
export const emergencyAlertSchema = z.object({
  type: z.enum(['medical', 'fire', 'earthquake', 'flood', 'security', 'general']),
  message: z.string().min(1).max(500),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    accuracy: z.number().optional(),
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  institutionId: z.string().uuid(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const sosRequestSchema = z.object({
  emergencyType: z.enum(['medical', 'fire', 'security', 'natural-disaster']),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  message: z.string().optional(),
  contactNumber: z.string().optional(),
});

// Content Security Policy for enhanced security
export const getCSPDirectives = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Vite in development
      ...(isDev ? ["'unsafe-eval'"] : []),
      'https://vercel.live',
      'https://va.vercel-scripts.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
    ],
    'connect-src': [
      "'self'",
      'https://api.vercel.com',
      'https://vitals.vercel-insights.com',
      'wss://ws-us3.pusher.com', // For real-time features
    ],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': !isDev,
  };
};

// Rate limiting for emergency endpoints
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(identifier: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Clean old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
  
  clear() {
    this.requests.clear();
  }
}

export const rateLimiter = new RateLimiter();

// Emergency action rate limits (more restrictive)
export const EMERGENCY_RATE_LIMITS = {
  SOS_REQUESTS: { limit: 5, windowMs: 60000 }, // 5 per minute
  ALERT_CREATION: { limit: 10, windowMs: 300000 }, // 10 per 5 minutes
  LOGIN_ATTEMPTS: { limit: 5, windowMs: 900000 }, // 5 per 15 minutes
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Secure random string generation
export const generateSecureId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for environments without crypto.randomUUID
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Security headers for deployment
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(self), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-XSS-Protection': '1; mode=block',
};

// Audit logging for security events
export const logSecurityEvent = (event: {
  type: 'login' | 'logout' | 'sos' | 'alert' | 'failed_auth' | 'rate_limit';
  userId?: string;
  ip?: string;
  userAgent?: string;
  details?: any;
}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: event.type,
    userId: event.userId || 'anonymous',
    ip: event.ip || 'unknown',
    userAgent: event.userAgent || 'unknown',
    details: event.details || {},
  };
  
  // In production, send to secure logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to your logging service
    console.log('SECURITY_EVENT:', JSON.stringify(logEntry));
  } else {
    console.log('🔒 Security Event:', logEntry);
  }
};