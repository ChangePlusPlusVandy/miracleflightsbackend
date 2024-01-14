"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServer = void 0;
const Test_routes_1 = __importDefault(require("../routes/Test.routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const configureServer = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use(body_parser_1.default.json({ limit: '5mb' })); //file size limit specification to receive PDFs
    app.use(express_1.default.json()); // Parse JSON bodies
    app.use((0, cors_1.default)()); // Enable CORS
    // Logging
    if (process.env.ENVIRONMENT !== 'test') {
        app.use((0, morgan_1.default)('dev'));
    }
    // Security
    app.use((0, helmet_1.default)());
    app.disable('x-powered-by');
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        app.use(Test_routes_1.default);
    }
    else {
        app.use(Test_routes_1.default);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, _, res, __) => {
        console.error(err.stack);
        res
            .status(403)
            .send({ message: "You're not authorized to access this endpoint!" });
    });
    // Create the server
    return http_1.default.createServer(app);
};
exports.configureServer = configureServer;
