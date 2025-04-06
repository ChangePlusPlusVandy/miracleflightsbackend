import logger from '../../util/logger';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

const createRedisClient = (): RedisClientType => {
  const client: RedisClientType = createClient({
    socket: {
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  });

  client.on('error', (e: Error) => {
    console.error('Redis client error:', e);
  });

  return client;
};

const redisClient = createRedisClient();

/**
 * Initializes Redis by connecting the client.
 * Call this function at your application's startup.
 */
(async () => {
  try {
    await redisClient.connect();
    logger.info(
      `[REDIS] Redis server initialized at http://localhost:${process.env.REDIS_PORT}`
    );
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    // Optionally, you can handle this error (e.g., exit the process)
  }
})();

export default redisClient;
