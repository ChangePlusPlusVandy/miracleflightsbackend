import { queryParameterExample } from '../controllers/TestControllers/queryParameterExample';
import { retrievePassengers } from '../controllers/TestControllers/retrievePassengers';
import { pathParameterExample } from '../controllers/TestControllers/pathParameterExample';
import { bodyParameterExample } from '../controllers/TestControllers/bodyParameterExample';
import express from 'express';

const exampleRouter = express.Router();

/* Classes Controller */
exampleRouter.get('/query', queryParameterExample);
exampleRouter.get('/path/:value', pathParameterExample);
exampleRouter.get('/body', bodyParameterExample);
exampleRouter.get('/retrievePassengers', retrievePassengers);

export = exampleRouter;
