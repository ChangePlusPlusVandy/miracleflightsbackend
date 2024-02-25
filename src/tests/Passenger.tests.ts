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
describe('GET /passenger/accompanying', () => {
  it('should return a 400 response', done => {
    chai
      .request(app)
      .get('/passenger/accompanying')
      .query({ id: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should be an accompanying passenger', done => {
    chai
      .request(app)
      .get('/passenger/accompanying')
      .query({ id: 'recleNlsBm3dheZHy' })
      .end((err, res) => {
        expect(res.body[0]['First Name']).to.be.oneOf([
          'Anakin',
          'Bail',
          'Jefferson ',
        ]);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should be an accompanying passenger', done => {
    chai
      .request(app)
      .get('/passenger/accompanying')
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
      .get('/passenger/accompanying')
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
  it('should return the correct passenger', done => {
    chai
      .request(app)
      .get('/passenger/rec3Wv1VViXYv3t72')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['First Name'].toString()).to.equal('Anakin');
        expect(res.body['Last Name'].toString()).to.equal('Skywalker ');
        expect(res.body['Email']).to.equal('zachmcmullen04@gmail.com');
        done();
      });
  });
});

describe('PUT passenger/:id', () => {
  it('should return a 400 response', done => {
    chai
      .request(app)
      .put('/passenger/junk')
      .send({ id: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return a 400 response', done => {
    chai
      .request(app)
      .put('/passenger/junk')
      .send({ passengerData: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should update street for anakin skywalker', done => {
    chai
      .request(app)
      .put('/passenger/rec3Wv1VViXYv3t72')
      .send({ Street: 'HELLOSTREET' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should update marital status for princess leia', done => {
    chai
      .request(app)
      .put('/passenger/recaUmd14q3YOP3Uf')
      .send({ 'Marital Status': 'Married' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should update household size for princess leia', done => {
    chai
      .request(app)
      .put('/passenger/recaUmd14q3YOP3Uf')
      .send({ 'Household Size': 3 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return a 400 response', done => {
    chai
      .request(app)
      .put('/passenger/recaUmd14q3YOP3Uf')
      .send({ 'Household Size': 'test' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should update email for jefferson morales', done => {
    chai
      .request(app)
      .put('/passenger/recLFdznCJOUPEx72')
      .send({ Email: 'loser@weirdo.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
