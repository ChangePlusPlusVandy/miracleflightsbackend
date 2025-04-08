import { encryptionUtil } from '../../util/encryption';
import type {
  ICachePlugin,
  TokenCacheContext,
  ICacheClient,
} from '@azure/msal-node';

const CACHE_KEY = process.env.CACHE_KEY as string;

class redisCachePlugin implements ICachePlugin {
  private client: ICacheClient;

  constructor(client: ICacheClient) {
    this.client = client;
  }

  public async beforeCacheAccess(cacheContext: TokenCacheContext): Promise<void> {
    try {
      const cacheData = await this.client.get(CACHE_KEY);
      if (cacheData) {
        const decryptedCacheData = await encryptionUtil.decrypt(cacheData);
        cacheContext.tokenCache.deserialize(decryptedCacheData);
      } else {
        console.log('Cache miss: No token cache found in Redis');
      }
    } catch (e) {
      console.error('beforeCacheAccess:', e);
    }
  }

  public async afterCacheAccess(cacheContext: TokenCacheContext): Promise<void> {
    if (cacheContext.cacheHasChanged) {
      const serializedCache = cacheContext.tokenCache.serialize();
      const encryptedCache = await encryptionUtil.encrypt(serializedCache);
      await this.client.set(CACHE_KEY, encryptedCache);
    }
  }
}

export default redisCachePlugin;
