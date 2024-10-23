import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type {
  SignUpRequest,
  SignInRequest,
  RefreshTokenRequest,
} from '../types/auth.type.js';
import { Logger } from '../utils/logger.js';

const auth = new Hono();
const logger = Logger.getInstance();

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(50),
  phoneNumber: z.string().optional(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

auth.post('/signup', zValidator('json', signUpSchema), async (c) => {
  const data = await c.req.json<SignUpRequest>();
  logger.info('회원가입 요청', { email: data.email });

  return c.json(
    {
      success: true,
      message: '회원가입이 완료되었습니다.',
    },
    201,
  );
});

auth.post('/signin', zValidator('json', signInSchema), async (c) => {
  const data = await c.req.json<SignInRequest>();
  logger.info('로그인 요청', { email: data.email });

  return c.json({
    success: true,
    data: {
      accessToken: 'dummy_access_token',
      refreshToken: 'dummy_refresh_token',
      user: {
        id: 'dummy_id',
        email: data.email,
        name: 'Dummy User',
      },
    },
  });
});

auth.post('/signout', async (c) => {
  const authHeader = c.req.header('Authorization');
  logger.info('로그아웃 요청');

  return c.json({
    success: true,
    message: '로그아웃되었습니다.',
  });
});

auth.post('/refresh-token', async (c) => {
  const data = await c.req.json<RefreshTokenRequest>();
  logger.info('토큰 갱신 요청');

  return c.json({
    success: true,
    data: {
      accessToken: 'new_dummy_access_token',
      refreshToken: 'new_dummy_refresh_token',
    },
  });
});

auth.get('/me', async (c) => {
  logger.info('사용자 정보 조회 요청');

  return c.json({
    success: true,
    data: {
      id: 'dummy_id',
      email: 'user@example.com',
      name: 'Dummy User',
    },
  });
});

export { auth };
