const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const teamData = require('./nba-team-data');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';
app.locals.teamData = teamData;

app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
});

module.exports = app;