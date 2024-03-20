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
        expect(res.body[0]['First Name']).to.be.oneOf([
          'Anakin',
          'Bail',
          'Jefferson',
        ]);
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

//Test createPassenger

describe('POST /createPassenger', () => {
  it('should return 400 if userId is not provided', done => {
    chai
      .request(app)
      .post('/passenger/')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 if passenger data is not provided', done => {
    chai
      .request(app)
      .post('/passenger/rec3Wv1VViXYv3t72')
      .send({ id: 'rec3Wv1VViXYv3t72' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body[0].message).to.equal('"fields" is required');
        done();
      });
  });

  it('should return 400 if user does not exist in AirTable', done => {
    chai
      .request(app)
      .post('/passenger/thisIsBad')
      .send({
        fields: {
          Relationship: 'Father',
          'First Name': 'Testman',
          'Last Name': 'tester',
          'Date of Birth': '1989-01-05',
          Gender: 'Male',
          Street: '123 Main St',
          City: 'Anytown',
          State: 'TN',
          Zip: '12345',
          Country: 'United States',
          'Cell Phone': '(123) 456-7890',
          Email: 'jane.doe@example.com',
          Waiver: true,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.contain('User does not exist');
        done();
      });
  });

  it('should return 200 and create a passenger when provided valid data', done => {
    chai
      .request(app)
      .post('/passenger/rec3Wv1VViXYv3t72')
      .send({
        fields: {
          Relationship: 'Father',
          'First Name': 'Testman',
          'Last Name': 'tester',
          'Date of Birth': '1989-01-05',
          Gender: 'Male',
          Street: '123 Main St',
          City: 'Anytown',
          State: 'TN',
          Zip: '12345',
          Country: 'United States',
          'Cell Phone': '(123) 456-7890',
          Email: 'jane.doe@example.com',
          Waiver: true,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['First Name']).to.be.oneOf(['Testman']);
        done();
      });
  });
});
