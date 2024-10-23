import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger as honoLogger } from 'hono/logger';
import { errorHandler } from './middleware/error.middleware.js';
import { Logger } from './utils/logger.js';
import { requestTiming } from './utils/requestTime.js';
import {
  botProtection,
  corsMiddleware,
  RateLimiter,
  requestSizeLimiter,
  securityHeaders,
  sqlInjectionProtection,
} from './middleware/security.middleware.js';
import { auth } from './routes/auth.route.js';

const PORT = 8000;

const app = new Hono();
const logger = Logger.getInstance();
const rateLimiter = new RateLimiter(60 * 1000, 100);

app.use('*', requestTiming);
app.use('*', securityHeaders);
app.use('*', corsMiddleware);
app.use('*', rateLimiter.middleware);
app.use('*', requestSizeLimiter(1024 * 1024));
app.use('*', botProtection);
app.use('*', sqlInjectionProtection);
app.use('*', honoLogger());
app.use('*', errorHandler);

app.route('/api/auth', auth);

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    logger.info(`Server is running on port ${info.port}`);
  },
);
