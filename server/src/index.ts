import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger as honoLogger } from 'hono/logger';
import { errorHandler } from './middleware/error.middleware.js';
import { Logger } from './utils/logger.js';
import { requestTiming } from './utils/requestTime.js';

const PORT = 8000;

const app = new Hono();
const logger = Logger.getInstance();

app.use('*', requestTiming);
app.use('*', honoLogger());
app.use('*', errorHandler);

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!',
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
