import logger from './util/logger';
import { configureServer } from './config/server.config';

// configure our server
const app = configureServer();

// define our port
const port = Number(process.env.PORT);

// start our server
app.listen(port, async () => {
  logger.info(`[SERVER] App is running at http://localhost:${port}`);

  console.log('AIRTABLE KEY: ' + process.env.AIRTABLE_API_KEY);
});
