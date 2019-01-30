process.env.NODE_ENV = 'test';
const configuration = require('../knexfile.js')['test'];
const database = require('knex')(configuration)
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

before(done => {
  database.migrate.latest()
    .then(() => done())
})

describe('Client Routes', () => {
  beforeEach(done => {
    database.migrate.rollback()
      .then(() => database.migrate.latest())
      .then(() => database.seed.run())
      .then(() => done())
  })
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
      beforeEach(done => {
        database.migrate.rollback()
          .then(() => database.migrate.latest())
          .then(() => database.seed.run())
          .then(() => done())
      })
      it('should return an array of teams from the GET "/api/v1/teams" endpoint', (done) => {
        chai.request(server)
          .get('/api/v1/teams')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            const responseText = JSON.parse(response.res.text)
            responseText.should.be.an('array');
            responseText[0].should.have.property('id');
            responseText[0].id.should.be.a('number');
            responseText[0].should.have.property('team_name');
            responseText[0].team_name.should.be.a('string');
            responseText[0].should.have.property('head_coach');
            responseText[0].head_coach.should.be.a('string');
            responseText[0].should.have.property('owner');
            responseText[0].owner.should.be.a('string');
            responseText[0].should.have.property('most_recent_championship');
            responseText[0].most_recent_championship.should.be.a('number');
            responseText[0].should.have.property('defensive_rating');
            responseText[0].defensive_rating.should.be.a('string');
            responseText[0].should.have.property('points_per_game');
            responseText[0].points_per_game.should.be.a('string');
            done();
          });
      });

      it('should return a single team object from the get "/api/v1/teams/:id" endpoint', (done) => {
        chai.request(server)
          .get('/api/v1/teams/1')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            const responseText = JSON.parse(response.res.text);
            responseText.should.be.an('array');
            responseText.should.have.lengthOf(1)
            responseText[0].should.have.property('id');
            responseText[0].id.should.be.a('number');
            responseText[0].should.have.property('team_name');
            responseText[0].team_name.should.be.a('string');
            responseText[0].should.have.property('head_coach');
            responseText[0].head_coach.should.be.a('string');
            responseText[0].should.have.property('owner');
            responseText[0].owner.should.be.a('string');
            responseText[0].should.have.property('most_recent_championship');
            responseText[0].most_recent_championship.should.be.a('number');
            responseText[0].should.have.property('defensive_rating');
            responseText[0].defensive_rating.should.be.a('string');
            responseText[0].should.have.property('points_per_game');
            responseText[0].points_per_game.should.be.a('string');
            done();
          });
      });

      it('should return status 404 with a message from the get "/api/v1/teams/:id" if there is no matching id', (done) => {
        chai.request(server)
          .get('/api/v1/teams/10')
          .end((error, response) => {
            response.should.have.status(404);
            response.should.be.json;
            const responseText = JSON.parse(response.res.text);
            responseText.should.have.property('error');
            responseText.error.should.equal('There are no entries with that id');
            done();
          });
      });
    });
  });
});