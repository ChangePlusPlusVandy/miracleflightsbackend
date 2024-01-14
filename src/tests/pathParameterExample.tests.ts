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
  server = app.listen(2303, () => {
    console.log('Mock server listening on port 2303');
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// test queryParameterExample
describe('pathParameterExample', () => {
  it('should return 418 and a message with the path parameter', done => {
    chai
      .request(app)
      .get('/path/Bob')
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
      .get('/path')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
