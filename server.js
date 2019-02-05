const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
});

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then(teams => response.status(200).json(teams))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('teams').where('id', id).select()
    .then((team) => {
      if (team.length > 0) {
        response.status(200).json(team);
      } else {
        response.status(404).json({ error: 'There are no entries with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;

  const parameters = ['team_name', 'head_coach', 'owner', 'most_recent_championship', 'defensive_rating', 'points_per_game'];

  for (const requiredParameter of parameters) {
    if (!team[requiredParameter]) {
      return response
        .status(422)
        .json({ error: `You are missing ${requiredParameter} from the expected format` });
    }
  }

  database('teams').insert(team, 'id')
    .then(body => response.status(201).json({ id: body[0] }))
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const team = request.body;
  database('teams').where('id', id).update(team)
    .then((teamId) => {
      if (teamId) {
        response.status(200).send(`Team at id ${teamId} updated`);
      } else {
        response.status(404).send('No teams with that id');
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('teams').where('id', id)
    .del()
    .then((result) => {
      if (result) {
        response.status(200).json({ id });
      } else {
        response.status(404).json({ error: result.statusText });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/players', (request, response) => {
  const key = Object.keys(request.query)[0];
  const value = request.query[key];

  if (key) {
    database('players').where(key, value).select()
      .then(players => response.status(200).json(players))
      .catch(error => response.status(500).json({ error }));
  } else {
    database('players').select()
      .then(players => response.status(200).json(players))
      .catch(error => response.status(500).json({ error }));
  }
});

app.get('/api/v1/players/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('players').where('id', id).select()
    .then((player) => {
      if (player.length > 0) {
        response.status(200).json(player);
      } else {
        response.status(404).json({ error: 'There are no entries with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/players', (request, response) => {
  const player = request.body;
  const parameters = ['name', 'team', 'games_played', 'points_per_game', 'field_goal_percentage', 'three_point_percentage', 'free_throw_percentage', 'rebounds_per_game', 'assists_per_game', 'steals_per_game', 'blocks_per_game'];

  for (const requiredParameter of parameters) {
    if (!player[requiredParameter]) {
      return response
        .status(422)
        .json({ error: `You are missing ${requiredParameter} from the expected format.` });
    }
  }
  database('players').insert(player, 'id')
    .then(body => response.status(201).json({ id: body[0] }))
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/players/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const player = request.body;

  database('players').where('id', id).update(player, 'id')
    .then((playerId) => {
      if (playerId.length > 0) {
        return response.status(200).send(`Player at id ${playerId} has been updated`);
      }
      return response.status(422).send('There is no player at that id');
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/players/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('players').where('id', id).del()
    .then((result) => {
      if (result) {
        response.status(200).json({ id });
      } else {
        response.status(404).json({ error: result.statusText });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => `${app.locals.title} is running on port ${app.get('port')}`);

module.exports = app;
