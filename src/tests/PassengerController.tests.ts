// PassengerController.tests.ts

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import sinon from 'sinon';
import Airtable from 'airtable';
import { configureServer } from '../config/server.config'

chai.use(chaiHttp);

describe('PassengerController Tests', () => {
  let server;
  let airtableBaseStub;

  before(done => {
    // Setup your Express application
    const app = configureServer();

    // Start your server on a test port
    server = app.listen(2301, () => {
      console.log('Test server running on port 2301');
      done();
    });
  });

  after(done => {
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
            { id: 'recLFdznCJOUPEx72', fields: { /* Your fields here */ } },
            { id: 'recjkNdBSRe5JsUI7', fields: { /* Your fields here */ } },
            { id: 'recSH24ZWh4UUd8iT', fields: { /* Your fields here */ } }
          ])
        })
      })
    }));
  });

  afterEach(() => {
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
  // testing for other endpoints.
});
