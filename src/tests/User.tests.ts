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
  server = app.listen(1235, () => {
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// Test case
describe('POST test/user', () => {
  it('should return a 200 response if a user exists', done => {
    chai
      .request(app)
      .post('/user/')
      .send({
        firstName: 'Boba',
        lastName: 'Fett',
        birthdate: '12-11-2000',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a 400 response if a user does not exists', done => {
    chai
      .request(app)
      .post('/user/')
      .send({
        firstName: 'Test',
        lastName: 'Person',
        birthdate: '12-11-2000',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
