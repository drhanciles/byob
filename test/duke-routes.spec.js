const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../duke-server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return a static site from the home route', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.be.a('string');
        done();
      });
  });

  it('should return 404 from an undefined route', (done) => {
    chai.request(server)
      .get('/ninjas')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });

  describe('API Routes', () => {
    describe('GET', () => {
      it('should return an array of teams from the GET "/api/v1/teams" endpoint', (done) => {
        
      });

      it('should return a single team object from the get "/api/v1/teams/:id" endpoint', (done) => {

      });
    });
  });
});