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
  server = app.listen(2302, () => {
    console.log('Mock server listening on port 2302');
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// test queryParameterExample
describe('queryParameterExample', () => {
  it('should return 418 and a message with the query parameter', done => {
    chai
      .request(app)
      .get('/query?name=Bob')
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
      .get('/query')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Name is required');
        done();
      });
  });
});
