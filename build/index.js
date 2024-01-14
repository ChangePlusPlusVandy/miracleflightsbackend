"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("./config/server.config");
const server = (0, server_config_1.configureServer)();
const hostname = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : 'localhost';
const port = Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 2301);
try {
    server.listen(port, hostname, () => {
        console.log(`[SERVER] 💻 ✅ Server running at http://${hostname}:${port}/`);
    });
}
catch (e) {
    console.log(`[SERVER] 💻 ❌ Boooo! Server failed to start with the error: ${e}`);
}
