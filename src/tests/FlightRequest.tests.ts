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

// Test getFlightLegsById
describe('GET /requests/:id/legs', () => {
  it('should return the correct passenger names, leg IDs, and Airtable record IDs for the flight legs', done => {
    chai
      .request(app)
      .get('/requests/recp5zrIaW8EZhJtu/legs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.is.not.empty;

        expect(res.body[0]).to.have.property('fields').that.is.an('object').that
          .is.not.empty;
        const firstFlightLegFields = res.body[0].fields;
        expect(firstFlightLegFields['Passenger Names']).to.equal(
          'Stormie  Gilchrist, Jessie  Gilchrist '
        );
        expect(firstFlightLegFields['Leg ID']).to.equal(
          '2023-02-06 | Pending | Departure SEA > JFK'
        );
        expect(firstFlightLegFields['AirTable Record ID']).to.equal(
          'rec0uwOR2O7cvLbDA'
        );
        done();
      });
  });
});
