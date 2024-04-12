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
  server = app.listen(1200, () => {
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// Test case
describe('DASHBOARD dashboard/getDashboardStats', () => {
  it('should return a 200 response', done => {
    chai
      .request(app)
      .get('/dashboard')
      .send({ name: 'Test flights this week' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['Flights This Week']).to.be.oneOf(['0', '1', '2', '3']);
        done();
      });
  });
  it('should return a 200 response', done => {
    chai
      .request(app)
      .get('/dashboard')
      .send({ name: 'Test flights today' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['Flights Today']).to.be.oneOf(['0', '1', '2', '3']);
        done();
      });
  });
  it('should return a 200 response', done => {
    chai
      .request(app)
      .get('/dashboard')
      .send({ name: 'Test flights this year' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['All Total Flights']).to.be.oneOf([
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ]);
        done();
      });
  });
});
