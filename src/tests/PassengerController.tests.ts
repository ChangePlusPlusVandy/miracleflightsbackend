import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Airtable from 'airtable';
import { configureServer } from '../config/server.config';

const expect = chai.expect;
chai.use(chaiHttp);

describe('PassengerController Tests', () => {
  let server;
  let airtableBaseStub;

  before((done) => {
    // Setup  Express application
    const app = configureServer();

    // Start  server on a test port
    server = app.listen(2301, () => {
      console.log('Test server running on port 2301');
      done();
    });
  });

  after((done) => {
    // Close the server after tests
    server.close(() => {
      console.log('Test server closed');
      done();
    });
  });

  beforeEach(() => {
    // Stub the Airtable base method to prevent actual API calls
    airtableBaseStub = sinon.stub(Airtable.prototype, 'base').callsFake(() => ({
      table: () => ({
        select: () => ({
          all: () => Promise.resolve([
            {
              id: 'recLFdznCJOUPEx72',
              fields: {
                Name: 'Morales, Jefferson',
                DateOfBirth: '2023-07-26',
                AirTableRecordID: 'recLFdznCJOUPEx72',
                Type: 'Accompanying Passenger',
                NumberOfBookedFlightRequests: 1
              }
            },
            {
              id: 'recjkNdBSRe5JsUI7',
              fields: {
                Name: 'Gilchrist, Jessie',
                DateOfBirth: '1980-01-01',
                AirTableRecordID: 'recjkNdBSRe5JsUI7',
                Type: 'Accompanying Passenger',
                NumberOfBookedFlightRequests: 0
              }
            },
            {
              id: 'recSH24ZWh4UUd8iT',
              fields: {
                Name: 'Gilchrist, Milo',
                DateOfBirth: '2014-01-01',
                AirTableRecordID: 'recSH24ZWh4UUd8iT',
                Type: 'Accompanying Passenger',
                NumberOfBookedFlightRequests: 0
              }
            }
          ])
        })
      })
    }));
  });

  afterEach(() => {
    // Restore the stub to its original state
    airtableBaseStub.restore();
  });

  describe('GET /passenger', () => {
    it('should return a list of passenger IDs for a given userId', (done) => {
      chai.request(server)
        .get('/passenger?userId=recV1y3bJr9eb2U5W')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal(['recLFdznCJOUPEx72', 'recjkNdBSRe5JsUI7', 'recSH24ZWh4UUd8iT']);
          done();
        });
    });

    it('should return a 400 response if userId is not provided', (done) => {
      chai.request(server)
        .get('/passenger') // Omitting the userId query parameter
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('User ID is required');
          done();
        });
    });
  });

  // tests for other endpoints here.
});
