const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const teamData = require('./db/data/nba-team-data');
const playerData = require('./db/data/nba-players-data');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';
app.locals.teamData = teamData;

app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
});

app.get('/api/v1/teams', (request, response) => {
  response.status(200).json(app.locals.teamData);
});

app.get('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const foundTeam = app.locals.teamData.find((team) => {
    return team.id === id;
  });

  if(foundTeam) {
    response.status(200).json(foundTeam);
  } else {
    response.status(404).json({error: 'There are no entries with that id'});
  }

});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
});

module.exports = app;