import redisClient from '../services/redis/redisClient';
import redisCachePlugin from '../services/redis/redisCachePlugin';
import redisClientWrapper from '../services/redis/redisClientWrapper';
import { LogLevel } from '@azure/msal-node';
import type { Configuration } from '@azure/msal-node';

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID as string,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET as string,
  },
  cache: {
    cachePlugin: new redisCachePlugin(new redisClientWrapper(redisClient)),
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel: LogLevel, message: string): void => {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose,
    },
  },
  telemetry: {},
};

export default msalConfig;
