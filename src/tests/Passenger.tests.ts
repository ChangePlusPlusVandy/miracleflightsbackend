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
  server = app.listen(3483, () => {
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// describe is group of tests
// it is the actual test itself
// Test case
describe('GET /passenger', () => {
  it('should return a 400 response', done => {
    chai
      .request(app)
      .get('/passenger')
      .query({ id: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should be an accompanying passenger', done => {
    chai
      .request(app)
      .get('/passenger')
      .query({ id: 'recleNlsBm3dheZHy' })
      .end((err, res) => {
        expect(res.body[0]['First Name']).to.be.oneOf(['Anakin', 'Bail']);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should be an accompanying passenger', done => {
    chai
      .request(app)
      .get('/passenger')
      .query({ id: 'recleNlsBm3dheZHy' })
      .end((err, res) => {
        expect(res.body[1]['Gender']).to.equal('Male');
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should be an accompanying passenger', done => {
    chai
      .request(app)
      .get('/passenger')
      .query({ id: 'recleNlsBm3dheZHy' })
      .end((err, res) => {
        expect(res.body[2]['Relationship']).to.be.oneOf(['Father', undefined]);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET /passenger/:id', () => {
  it('should return a 400 response', done => {
    chai
      .request(app)
      .get('/passenger/blahblahblah')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return a 200 response', done => {
    chai
      .request(app)
      .get('/passenger/recleNlsBm3dheZHy')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return the correct passenger', done => {
    chai
      .request(app)
      .get('/passenger/recleNlsBm3dheZHy')
      .end((err, res) => {
        expect(res.body['First Name']).to.equal('Anakin');
        expect(res.body['Last Name']).to.equal('Skywalker');
        expect(res.body['Email']).to.equal('zachmcmullen04@gmail.com');
        expect(res.body['Passenger Names']).to.equal('Anakin Skywalker');
        done();
      });
  });
});
