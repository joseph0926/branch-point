import type { Context, Next } from 'hono';

export async function requestTiming(c: Context, next: Next) {
  const start = performance.now();

  try {
    await next();
  } finally {
    const end = performance.now();
    const responseTime = end - start;
    c.set('responseTime', `${responseTime.toFixed(2)}ms`);
  }
}
