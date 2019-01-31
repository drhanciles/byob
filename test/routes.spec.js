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
  });

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
}); 
  describe('API Routes', () => {
    describe('GET', () => {
      beforeEach(done => {
        database.migrate.rollback()
          .then(() => database.migrate.latest())
          .then(() => database.seed.run())
          .then(() => done())
      });

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

      it('should return an array of players from GET "/api/v1/players" endpoint', (done) => {
          chai.request(server)
          .get('/api/v1/players')
          .end((error, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.a('array')
            response.body[0].should.have.property('name')
            response.body[0].name.should.be.a('string')
            response.body[0].should.have.property('team')
            response.body[0].team.should.be.a('string')
            response.body[0].should.have.property('points_per_game')
            response.body[0].points_per_game.should.be.a('string')
            response.body[0].should.have.property('field_goal_percentage')
            response.body[0].field_goal_percentage.should.be.a('string')
            response.body[0].should.have.property('three_point_percentage')
            response.body[0].three_point_percentage.should.be.a('string')
            response.body[0].should.have.property('free_throw_percentage')
            response.body[0].free_throw_percentage.should.be.a('string')
            response.body[0].should.have.property('rebounds_per_game')
            response.body[0].rebounds_per_game.should.be.a('string')
            response.body[0].should.have.property('assists_per_game')
            response.body[0].assists_per_game.should.be.a('string')
            response.body[0].should.have.property('steals_per_game')
            response.body[0].steals_per_game.should.be.a('string')
            response.body[0].should.have.property('blocks_per_game')
            response.body[0].blocks_per_game.should.be.a('string')
            done(); 
          })
      }); 

      it('should get a player or players based on a query', (done) => {
        chai.request(server)
          .get('/api/v1/players')
          .query({ rebounds_per_game: 10 })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.should.have.lengthOf(1);
            response.body[0].should.have.property('name');
            response.body[0].name.should.be.a('string');
            response.body[0].should.have.property('team');
            response.body[0].team.should.be.a('string');
            response.body[0].should.have.property('points_per_game');
            response.body[0].points_per_game.should.be.a('string');
            response.body[0].should.have.property('field_goal_percentage');
            response.body[0].field_goal_percentage.should.be.a('string');
            response.body[0].should.have.property('three_point_percentage');
            response.body[0].three_point_percentage.should.be.a('string');
            response.body[0].should.have.property('free_throw_percentage');
            response.body[0].free_throw_percentage.should.be.a('string');
            response.body[0].should.have.property('rebounds_per_game');
            response.body[0].rebounds_per_game.should.be.a('string');
            response.body[0].should.have.property('assists_per_game');
            response.body[0].assists_per_game.should.be.a('string');
            response.body[0].should.have.property('steals_per_game');
            response.body[0].steals_per_game.should.be.a('string');
            response.body[0].should.have.property('blocks_per_game');
            response.body[0].blocks_per_game.should.be.a('string');
            done();
          })
      })

      it('should GET a player by a specific id when a request is made too "/api/v1/players/:id"', (done) => {
        chai.request(server)
          .get('/api/v1/players/2')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body[0].should.have.property('name');
            response.body[0].name.should.be.a('string');
            response.body[0].should.have.property('team');
            response.body[0].team.should.be.a('string');
            response.body[0].should.have.property('points_per_game');
            response.body[0].points_per_game.should.be.a('string');
            response.body[0].should.have.property('field_goal_percentage');
            response.body[0].field_goal_percentage.should.be.a('string');
            response.body[0].should.have.property('three_point_percentage');
            response.body[0].three_point_percentage.should.be.a('string');
            response.body[0].should.have.property('free_throw_percentage');
            response.body[0].free_throw_percentage.should.be.a('string');
            response.body[0].should.have.property('rebounds_per_game');
            response.body[0].rebounds_per_game.should.be.a('string');
            response.body[0].should.have.property('assists_per_game');
            response.body[0].assists_per_game.should.be.a('string');
            response.body[0].should.have.property('steals_per_game');
            response.body[0].steals_per_game.should.be.a('string');
            response.body[0].should.have.property('blocks_per_game');
            response.body[0].blocks_per_game.should.be.a('string');
            done(); 
      })
    });

    it('should return status 404 with a message from the get "/api/v1/players/:id" if there is no matching id', (done) => {
      chai.request(server)
        .get('/api/v1/players/10')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('error');
          response.body.error.should.equal('There are no entries with that id');
          done();
        });
      });
    });

    describe('POST', () => {
      it('should add a team when a request is sent to POST "/api/v1/teams"', (done) => {
        chai.request(server)
          .post('/api/v1/teams')
          .send({
            team_name: 'Tuscaloosa Finishers',
            head_coach: 'Bob\'s YourUncle',
            owner: 'Jack O. Trades',
            most_recent_championship: 1942,
            defensive_rating: 15.5,
            points_per_game: 5
          })
          .end((error, response) => {
            response.should.have.status(201);
            response.should.be.json;
            response.body.should.have.property('id');
            response.body.id.should.be.a('number');
            done();
          }) 
      })

      it('should return status 422 if the body of the request is not correct', (done) => {
        chai.request(server)
          .post('/api/v1/teams')
          .send({
            team_name: 'The Mighty Ducks',
            owner: 'Tony Ressler',
            most_recent_championship: 1958,
            defensive_rating: 111.3,
            points_per_game: 109.9 
          })
          .end((error, response) => {
            response.should.have.status(422);
            response.should.be.json;
            response.body.should.have.property('error');
            response.body.error.should.equal(`You are missing head_coach from the expected format`);
            done();
          });
      });

      it('should add a new player when a request is sent to POST "/api/v1/players"', (done) => {
        chai.request(server)
          .post('/api/v1/players')
          .send({
            name: "Kobe Bryant", 
            team: "Los Angeles Lakers", 
            games_played: 81,
            points_per_game: 35.6, 
            field_goal_percentage: 45, 
            three_point_percentage: 40, 
            free_throw_percentage: 90,
            rebounds_per_game: 6.1, 
            assists_per_game: 2.4, 
            steals_per_game: 2.2, 
            blocks_per_game: 1.33
          })
          .end((err, response) => {
            response.should.have.status(201); 
            response.should.be.json;
            response.body.should.have.property('id'); 
            response.body.id.should.be.a('number'); 
            done();
          })
      });
  
      it('should not add a player if missing data is sent to "/api/v1/players",', (done) => {
        chai.request(server)
          .post('/api/v1/players')
          .send({
            name: "Kobe Bryant", 
            team: "Los Angeles Lakers", 
            points_per_game: 35.6, 
            field_goal_percentage: 45, 
            three_point_percentage: 40, 
            free_throw_percentage: 90,
            rebounds_per_game: 6.1, 
            assists_per_game: 2.4, 
            steals_per_game: 2.2, 
            blocks_per_game: 1.33
          })
          .end((err, response) => {
            response.should.have.status(422); 
            response.should.be.json; 
            response.body.should.have.property('error'); 
            response.body.error.should.equal('You\'re missing games_played from the expected format.'); 
            done(); 
          })
      })
    });

    describe('PATCH', () => {
      it('should change the value of a given property on the team at the given id', (done) => {
        chai.request(server)
          .patch('/api/v1/teams/1')
          .send({
            defensive_rating: 1000,
            points_per_game: 400
          })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.html;
            response.res.text.should.be.a('string');
            response.res.text.should.equal('Team at id 1 updated');
            done();
          })
      })

      it('should return status 404 if there are no matching teams', (done) => {
        chai.request(server)
          .patch('/api/v1/teams/10')
          .send({
            defensive_rating: 1000,
            points_per_game: 400
          })
          .end((error, response) => {
            response.should.have.status(404);
            response.should.be.html;
            response.res.text.should.be.a('string');
            response.res.text.should.equal('No teams with that id')
            done();
          })
      })

      it('should update the given property on a player mathing the params in a PATCH request sent to "/api/v1/players/:id"', (done) => {
        chai.request(server)
        .patch('/api/v1/players/3')
        .send({
          games_played: 53, 
          three_point_percentage: 35
        })
        .end((error, response) => {
          response.should.have.status(200); 
          response.should.be.html; 
          response.res.text.should.be.a('string')
          response.res.text.should.equal('Player at id 3 has been updated')
          done(); 
        })
      }); 
  
      it('should return an error if there are no players that match params', (done) => {
        chai.request(server)
        .patch('/api/v1/players/12')
        .send({
          games_played: 53, 
          three_point_percentage: 35
        })
        .end((error, response) => {
          response.should.have.status(422); 
          response.should.be.html; 
          response.res.text.should.be.a('string'); 
          response.res.text.should.equal('There is no player at that id')
          done(); 
        })
      }); 
    })

    describe('DELETE', () => {
      it('should remove a team when a request to DELETE "/api/v1/teams/:id" has been made', (done) => {
        chai.request(server)
          .del('/api/v1/teams/2')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.have.property('id');
            response.body.id.should.be.a('number');
            done(); 
          });
      });
      
      it('should remove a player when a request to DELETE "/api/v1/players/:id" has been made', (done) => {
        chai.request(server)
          .del('/api/v1/players/2')
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.have.property('id');
            response.body.id.should.be.a('number');
            done(); 
          });
      });
    });
  }); 

  describe('POST', () => {
    it.skip('should add a team when a request is sent to POST "/api/v1/teams"', (done) => {
      chai.request(server)
        .post('/api/')
    }); 

    it('should add a new player when a request is sent to POST "/api/v1/players"', (done) => {
      chai.request(server)
        .post('/api/v1/players')
        .send({
          name: "Kobe Bryant", 
          team: "Los Angeles Lakers", 
          games_played: 81,
          points_per_game: 35.6, 
          field_goal_percentage: 45, 
          three_point_percentage: 40, 
          free_throw_percentage: 90,
          rebounds_per_game: 6.1, 
          assists_per_game: 2.4, 
          steals_per_game: 2.2, 
          blocks_per_game: 1.33
        })
        .end((err, response) => {
          response.should.have.status(201); 
          response.should.be.json;
          response.body.should.have.property('id'); 
          response.body.id.should.be.a('number'); 
          done();
        })
    });

    it('should not add a player if missing data is sent to "/api/v1/players",', (done) => {
      chai.request(server)
        .post('/api/v1/players')
        .send({
          name: "Kobe Bryant", 
          team: "Los Angeles Lakers", 
          points_per_game: 35.6, 
          field_goal_percentage: 45, 
          three_point_percentage: 40, 
          free_throw_percentage: 90,
          rebounds_per_game: 6.1, 
          assists_per_game: 2.4, 
          steals_per_game: 2.2, 
          blocks_per_game: 1.33
        })
        .end((err, response) => {
          response.should.have.status(422); 
          response.should.be.json; 
          response.body.should.have.property('error'); 
          response.body.error.should.equal('You\'re missing games_played from the expected format.'); 
          done(); 
        })
    })
  })
  describe('PATCH', () => {
    it('should update the given property on a player mathing the params in a PATCH request sent to "/api/v1/players/:id"', (done) => {
      chai.request(server)
      .patch('/api/v1/players/3')
      .send({
        games_played: 53, 
        three_point_percentage: 35
      })
      .end((error, response) => {
        response.should.have.status(200); 
        response.should.be.html; 
        response.res.text.should.be.a('string');
        response.res.text.should.equal('Player at id 3 has been updated');
        done(); 
      })
    })

    it('should return an error if there are no players that match params', (done) => {
      chai.request(server)
      .patch('/api/v1/players/12')
      .send({
        games_played: 53, 
        three_point_percentage: 35
      })
      .end((error, response) => {
        response.should.have.status(422); 
        response.should.be.html; 
        response.res.text.should.be.a('string'); 
        response.res.text.should.equal('There is no player at that id');
        done(); 
      });
    });
  });
}); 
