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
  server = app.listen(1234, () => {
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// Test case
describe('POST test/bodyParameterExample', () => {
  it('should return a 418 response', done => {
    chai
      .request(app)
      .get('/test/body')
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res).to.have.status(418);
        done();
      });
  });
  it('should return a 400 response', done => {
    chai
      .request(app)
      .get('/test/body')
      .send({ name: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// test queryParameterExample
describe('queryParameterExample', () => {
  it('should return 418 and a message with the query parameter', done => {
    chai
      .request(app)
      .get('/test/query?name=Bob')
      .end((err, res) => {
        expect(res).to.have.status(418);
        expect(res.text).to.equal(
          'I cant make coffee! Thanks for your request though, Bob. Great use of a query parameter!'
        );
        done();
      });
  });

  it('should return 400 if no query parameter is provided', done => {
    chai
      .request(app)
      .get('/test/query')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Name is required');
        done();
      });
  });
});

// test queryParameterExample
describe('pathParameterExample', () => {
  it('should return 418 and a message with the path parameter', done => {
    chai
      .request(app)
      .get('/test/path/Bob')
      .end((err, res) => {
        expect(res).to.have.status(418);
        expect(res.text).to.equal(
          'I cant make coffee! Thanks for your request though, Bob. Great use of a path parameter!'
        );
        done();
      });
  });

  it('should return 404 if no path parameter is provided', done => {
    chai
      .request(app)
      .get('/test/path')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
