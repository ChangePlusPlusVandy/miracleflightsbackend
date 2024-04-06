import router from '../routes/routes';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import type { Request, Response } from 'express';

export const configureServer = () => {
  const app = express();

  // Middleware
  app.use(express.json()); // Parse JSON bodies
  app.use(cors()); // Enable CORS

  // Security
  app.use(helmet());
  app.disable('x-powered-by');

  // Logging
  if (process.env.ENVIRONMENT !== 'test') {
    app.use(morgan('dev'));
  }

  // Routes
  app.use(router);

  // 404 - No route found
  router.use((_: Request, res: Response) => {
    res.status(404).send('404: Page not found');
  });

  // Create the server
  return app;
};
