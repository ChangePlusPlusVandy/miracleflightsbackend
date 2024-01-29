import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { configureServer } from '../config/server.config';
import dotenv from 'dotenv';
import type { Server } from 'http';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const app = configureServer();
let server: Server;

before(done => {
  server = app.listen(1234, () => {
    done();
  });
});

after(done => {
  server.close();
  done();
});

// Mock Airtable API
const airtableMock = nock('https://api.airtable.com')
  .persist() 
  .get('/v0/appwPsfAb6U8CV3mf/Passengers')
  .reply(200, {
    records: [
      // your mocked records here
    ],
  });

describe('GET /passengers/user', () => {
  it('should return all passengers for the user', done => {
    const userId = 'testUserId';

    chai
      .request(app)
      .get(`/passengers/user?userId=${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Perform more expectations: check if the response body has the passengers data
        done();
      });
  });

  it('should return 400 if userId is not provided', done => {
    chai
      .request(app)
      .get('/passengers/user')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('User ID is required');
        done();
      });
  });

  // Add more test cases as needed
});
