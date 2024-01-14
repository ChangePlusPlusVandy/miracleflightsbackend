import exampleRouter from '../routes/Test.routes';
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import http from 'http';

export const configureServer = () => {
  const app = express();

  // Middleware
  app.use(bodyparser.json({ limit: '5mb' })); //file size limit specification to receive PDFs
  app.use(express.json()); // Parse JSON bodies
  app.use(cors()); // Enable CORS

  // Logging
  if (process.env.ENVIRONMENT !== 'test') {
    app.use(morgan('dev'));
  }

  // Security
  app.use(helmet());
  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    app.use(exampleRouter);
  } else {
    app.use(exampleRouter);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _, res: any, __) => {
    console.error(err.stack);
    res
      .status(403)
      .send({ message: "You're not authorized to access this endpoint!" });
  });

  // Create the server
  return http.createServer(app);
};
