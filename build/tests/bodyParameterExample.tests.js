"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("../config/server.config");
const chai_http_1 = __importDefault(require("chai-http"));
const dotenv_1 = __importDefault(require("dotenv"));
const chai_1 = __importStar(require("chai"));
dotenv_1.default.config();
// set up chai
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
// set up mock server
const app = (0, server_config_1.configureServer)();
let server;
// start mock server
before(done => {
    server = app.listen(2301, () => {
        console.log('Mock server listening on port 2301');
        done();
    });
});
// close mock server
after(done => {
    server.close();
    done();
});
// Test case
describe('POST /bodyParameterExample', () => {
    it('should return a 418 response', done => {
        chai_1.default
            .request(app)
            .get('/body')
            .send({ name: 'Test' })
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(418);
            done();
        });
    });
    it('should return a 400 response', done => {
        chai_1.default
            .request(app)
            .get('/body')
            .send({ name: '' })
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(400);
            done();
        });
    });
});
