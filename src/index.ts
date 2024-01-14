import { configureServer } from './config/server.config';
import type { StrictAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const server = configureServer();
const hostname: string = process.env.HOST ?? 'localhost';
const port: number = Number(process.env.PORT ?? 2301);

try {
  server.listen(port, hostname, () => {
    console.log(`[SERVER] 💻 ✅ Server running at http://${hostname}:${port}/`);
  });
} catch (e) {
  console.log(
    `[SERVER] 💻 ❌ Boooo! Server failed to start with the error: ${e}`
  );
}
