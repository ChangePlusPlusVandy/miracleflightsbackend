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
  server = app.listen(3484, () => {
    done();
  });
});

// close mock server
after(done => {
  server.close();
  done();
});

// Test getAllFlightRequestsForUser
describe('GET /requests/', () => {
  it('should return requests with the correct passenger name, flight request ID, and flight leg departure time for a given user', done => {
    chai
      .request(app)
      .get('/requests/?userId=recV1y3bJr9eb2U5W') // Assuming userId is passed as a query parameter
      .end((err, res) => {
        expect(res).to.have.status(200);
        const requests = res.body;

        // Assuming we're testing the first request in the array for simplicity
        const firstRequest = requests[0];
        expect(firstRequest).to.have.property('id').that.is.a('string');
        expect(firstRequest)
          .to.have.nested.property('Request ID')
          .that.is.a('string');
        expect(firstRequest)
          .to.have.nested.property('Request ID')
          .that.equals(
            '2022-12-08 | In Progress | Gilchrist, Stormie | 2014-06-21'
          );

        done();
      });
  });

  it('should return a 400 response for invalid or missing ID', done => {
    chai
      .request(app)
      .get('/requests/?userId=blahblahblah')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// Test getFlightRequestByID
describe('GET /requests', () => {
  it('should return the correct request ID, origin airport, destination airport, and passenger name', done => {
    chai
      .request(app)
      .get('/requests/recp5zrIaW8EZhJtu')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.fields).to.include.all.keys(
          'Request ID',
          'Origin Airport',
          'Destination Airport',
          'Patient Name'
        );
        expect(res.body.fields['Request ID']).to.equal(
          '2022-12-08 | In Progress | Gilchrist, Stormie | 2014-06-21'
        );
        expect(res.body.fields['Origin Airport']).to.equal('SEA');
        expect(res.body.fields['Destination Airport']).to.equal('JFK');
        expect(res.body.fields['Patient Name']).to.equal('Stormie  Gilchrist');
        done();
      });
  });

  it('should return a 400 response for invalid or missing ID', done => {
    chai
      .request(app)
      .get('/requests/blahblahblah')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
