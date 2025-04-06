import type { ICacheClient } from '@azure/msal-node';
import type {
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts,
} from 'redis';

const CACHE_KEY = process.env.CACHE_KEY as string; // app cache
const CACHE_TTL = 60 * 60 * 24; // 24 hour duration
const MAX_MEMORY = '4000mb';
const EVICTION_POLICY = 'volatile-lru';
const EMPTY_STRING = '';

class redisClientWrapper implements ICacheClient {
  cacheClient: RedisClientType<RedisDefaultModules, RedisFunctions, RedisScripts>;

  constructor(cacheClient: RedisClientType<any, any, any>) {
    this.cacheClient = cacheClient as RedisClientType<
      RedisDefaultModules,
      RedisFunctions,
      RedisScripts
    >;

    this.configureRedis().catch(e => console.warn('Redis config failed:', e));
  }

  private async configureRedis(): Promise<void> {
    try {
      await this.cacheClient.configSet('maxmemory', MAX_MEMORY);
      await this.cacheClient.configSet('maxmemory-policy', EVICTION_POLICY);
    } catch (e) {
      console.warn('Redis configuration failed (might be read-only):', e);
    }
  }

  /**
   * Gets data from the cache given the fixed key (one cache blob)
   *
   * @returns
   */
  public async get(): Promise<string> {
    try {
      return (await this.cacheClient.get(CACHE_KEY)) || EMPTY_STRING;
    } catch (e) {
      console.error(e);
    }

    return EMPTY_STRING;
  }

  /**
   * Sets data in cache given the value and fixed key
   *
   * @param value value to be set in cache
   * @returns
   */
  public async set(_key: string, value: string): Promise<string> {
    try {
      return (
        (await this.cacheClient.set(CACHE_KEY, value, { EX: CACHE_TTL })) ||
        EMPTY_STRING
      );
    } catch (e) {
      console.error(e);
    }

    return EMPTY_STRING;
  }
}

export default redisClientWrapper;
