import { configureServer } from '../config/server.config';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import type { Server } from 'http';
dotenv.config();

// set up chai
chai.use(chaiHttp);
chai.should();

// set up mock server
const app = configureServer();
let server: Server;

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
    chai
      .request(app)
      .get('/body')
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res).to.have.status(418);
        done();
      });
  });
  it('should return a 400 response', done => {
    chai
      .request(app)
      .get('/body')
      .send({ name: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
