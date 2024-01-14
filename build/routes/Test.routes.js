"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const queryParameterExample_1 = require("../controllers/TestControllers/queryParameterExample");
const retrievePassengers_1 = require("../controllers/TestControllers/retrievePassengers");
const pathParameterExample_1 = require("../controllers/TestControllers/pathParameterExample");
const bodyParameterExample_1 = require("../controllers/TestControllers/bodyParameterExample");
const express_1 = __importDefault(require("express"));
const exampleRouter = express_1.default.Router();
/* Test Controller */
exampleRouter.get('/query', queryParameterExample_1.queryParameterExample);
exampleRouter.get('/path/:value', pathParameterExample_1.pathParameterExample);
exampleRouter.get('/body', bodyParameterExample_1.bodyParameterExample);
exampleRouter.get('/retrievePassengers', retrievePassengers_1.retrievePassengers);
module.exports = exampleRouter;
