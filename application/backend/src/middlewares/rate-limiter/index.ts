import { rateLimit } from 'express-rate-limit';
import { RedisStore, type RedisReply } from 'rate-limit-redis';
import RedisClient from 'ioredis';

export class RateLimiterMiddleware {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient(6379, 'voice-memo-redis');
  }

  private createStore(prefixKey: string) {
    return new RedisStore({
      prefix: prefixKey,
      sendCommand: (command: string, ...args: string[]) => 
        this.redisClient.call(command, ...args) as Promise<RedisReply>,
    });
  }

  // Global Limit
  public get global() {
    return rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 300, // Max 300 requests
      standardHeaders: true,
      legacyHeaders: false,
      store: this.createStore('rl:global:'),
      handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
    });
  }

  // Auth Limit
  public get auth() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Just 10 tries
      standardHeaders: true,
      legacyHeaders: false,
      store: this.createStore('rl:auth:'),
      handler: (req, res) => {
        res.status(429).json({ error: 'Too many login attempts. Blocked for 15 minutes.' });
      }
    });
  }

  // Upload limit
  public get upload() {
    return rateLimit({
      windowMs: 60 * 60 * 1000, // 1 Hour
      max: 20, // Just 20 sends
      standardHeaders: true,
      legacyHeaders: false,
      store: this.createStore('rl:upload:'),
      handler: (req, res) => {
        res.status(429).json({ error: 'Upload quota exceeded. Try again in an hour.' });
      }
    });
  }
}

// export instance Singleton
export const rateLimiter = new RateLimiterMiddleware();