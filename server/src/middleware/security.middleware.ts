import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Logger } from '../utils/logger.js';

const logger = Logger.getInstance();

export const securityHeaders = async (c: Context, next: Next) => {
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "img-src 'self' data: https:; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self'",
  );
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  );

  await next();
};

export const corsMiddleware = async (c: Context, next: Next) => {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = c.req.header('Origin');

  if (origin && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    c.header('Access-Control-Max-Age', '86400');
  }

  if (c.req.method === 'OPTIONS') {
    return c.status(204);
  }

  await next();
};

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private store: RateLimitStore = {};
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    setInterval(() => this.cleanupStore(), windowMs);
  }

  private cleanupStore() {
    const now = Date.now();
    for (const key in this.store) {
      if (this.store[key].resetTime <= now) {
        delete this.store[key];
      }
    }
  }

  middleware = async (c: Context, next: Next) => {
    const ip =
      c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';

    const now = Date.now();

    if (!this.store[ip]) {
      this.store[ip] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
    } else {
      if (this.store[ip].resetTime <= now) {
        this.store[ip] = {
          count: 1,
          resetTime: now + this.windowMs,
        };
      } else {
        this.store[ip].count++;

        if (this.store[ip].count > this.maxRequests) {
          logger.warn('Rate limit exceeded', { ip });
          c.header(
            'Retry-After',
            String(Math.ceil((this.store[ip].resetTime - now) / 1000)),
          );
          throw new HTTPException(429, { message: 'Too Many Requests' });
        }
      }
    }

    c.header('X-RateLimit-Limit', String(this.maxRequests));
    c.header(
      'X-RateLimit-Remaining',
      String(Math.max(0, this.maxRequests - this.store[ip].count)),
    );
    c.header(
      'X-RateLimit-Reset',
      String(Math.ceil(this.store[ip].resetTime / 1000)),
    );

    await next();
  };
}

export const requestSizeLimiter = (maxSize: number = 1024 * 1024) => {
  return async (c: Context, next: Next) => {
    const contentLength = parseInt(c.req.header('content-length') || '0');

    if (contentLength > maxSize) {
      logger.warn('Request size limit exceeded', {
        size: contentLength,
        maxSize,
      });
      throw new HTTPException(413, {
        message: 'Payload Too Large',
      });
    }

    await next();
  };
};

export const botProtection = async (c: Context, next: Next) => {
  const userAgent = c.req.header('user-agent') || '';
  const suspiciousPatterns = [
    /crawl|bot|spider|wget|curl|^$/i,
    /semrush|screaming|ahrefs/i,
    /<|>|'|"|;|alert|script/i,
  ];

  if (suspiciousPatterns.some((pattern) => pattern.test(userAgent))) {
    logger.warn('Suspicious user agent detected', { userAgent });
    throw new HTTPException(403, { message: 'Access Denied' });
  }

  await next();
};

export const sqlInjectionProtection = async (c: Context, next: Next) => {
  const suspiciousPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i,
  ];

  const checkString = (str: string): boolean => {
    return suspiciousPatterns.some((pattern) => pattern.test(str));
  };

  const url = new URL(c.req.url);
  for (const [key, value] of url.searchParams.entries()) {
    if (checkString(value)) {
      logger.warn('SQL Injection attempt detected in query params', {
        param: key,
        value,
      });
      throw new HTTPException(403, { message: 'Invalid Request' });
    }
  }

  if (c.req.header('content-type')?.includes('application/json')) {
    try {
      const body = await c.req.json();
      const checkObject = (obj: any) => {
        for (const key in obj) {
          if (typeof obj[key] === 'string' && checkString(obj[key])) {
            throw new Error('SQL Injection pattern detected');
          } else if (typeof obj[key] === 'object') {
            checkObject(obj[key]);
          }
        }
      };
      checkObject(body);
    } catch (error) {
      logger.warn('SQL Injection attempt detected in request body', { error });
      throw new HTTPException(403, { message: 'Invalid Request' });
    }
  }

  await next();
};
