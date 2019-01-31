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
    .then(teams => {
      response.status(200).json(teams);
    })
    .catch(error => {
      response.status(500).json({ error })
    }); 
});

app.get('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id);
  database('teams').where('id', id).select()
    .then(team => {
      if(team.length > 0) {
        response.status(200).json(team);
      } else {
        response.status(404).json({error: 'There are no entries with that id'});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    }); 
});

app.get('/api/v1/players', (request, response) => {
  database('players').select()
  .then(players => {
    response.status(200).json(players);
  })
  .catch(error => {
    response.status(500).json({ error })
  });
}); 

app.get('/api/v1/players/:id', (request, response) => {
  const id = parseInt(request.params.id);
  database('players').where('id', id).select()
    .then(player => {
      if(player.length > 0) {
        response.status(200).json(player)
      } else {
        response.status(404).json({error: 'There are no entries with that id'});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

// app.get('/api/v1/players?:key=:value', (request, response) => {
//   database('players').where(request.params.key, request.params.value).select()
//     .then(() => {})
// })

app.post('/api/v1/teams', (request, response) => {
  const { body } = request;

  const parameters = ['team_name', 'head_coach', 'owner', 'most_recent_championship', 'defensive_rating', 'points_per_game'];

  for (let requiredParameter of parameters) {
    if(!body[requiredParameter]) {
      return response
        .status(422)
        .json({ error: `You are missing ${requiredParameter} from the expected format`})
    }
  }

  database('teams').insert(body, 'id')
    .then(body => response.status(201).json({ id: body[0] }))
    .catch(error => response.status(500).json({ error }))
});

app.delete('/api/v1/teams/:id', (request, response) => {
  const id = parseInt(request.params.id)
  database('teams').where('id', id)
    .del()
    .then(result => {
      if(result) {
        response.status(200).json({ id })
      } else {
        response.status(404).json({ error })
      }
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.delete('/api/v1/players/:id', (request, response) => {
  const id = parseInt(request.params.id)
  database('players').where('id', id)
    .del()
    .then(result => {
      if(result) {
        response.status(200).json({ id })
      } else {
        response.status(404).json({ error })
      }
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
});

module.exports = app;