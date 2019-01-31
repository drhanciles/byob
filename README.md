# Fantasy Basketball API
This API was designed to allow users to get the top 3 scorers from each NBA team to aid in decisions on which fantasy players they would like to select. The API also stores relevant team data to throughly understand the stats of the players team in relation to their stats. 

## GET all teams:
```
GET /api/v1/teams
```
Recieve an array of NBA teams with relevant stats. 

Sample Response: 
```
[
  {
      "id": 138,
      "team_name": "Milwaukee Bucks",
      "head_coach": "Mike Budenholzer",
      "owner": "Wes Edens",
      "most_recent_championship": 1971,
      "defensive_rating": "103.7",
      "points_per_game": "117.3",
      "created_at": "2019-01-30T21:40:44.300Z",
      "updated_at": "2019-01-30T21:40:44.300Z"
  },
  {
      "id": 139,
      "team_name": "Golden State Warriors",
      "head_coach": "Steve Kerr",
      "owner": "Jow Lacob",
      "most_recent_championship": 2018,
      "defensive_rating": "108.8",
      "points_per_game": "119.1",
      "created_at": "2019-01-30T21:40:44.306Z",
      "updated_at": "2019-01-30T21:40:44.306Z"
  },
  {
      "id": 140,
      "team_name": "Toronto Raptors",
      "head_coach": "Nick Nurse",
      "owner": "Maple Leaf Sports and Entertainment",
      "most_recent_championship": null,
      "defensive_rating": "107.5",
      "points_per_game": "114.1",
      "created_at": "2019-01-30T21:40:44.311Z",
      "updated_at": "2019-01-30T21:40:44.311Z"
  }
]
```

## GET all players:
```
GET /api/v1/players
```
Recieve an arry of the top 3 scoring leaders from each team with additional stats. 

Sample Response: 
```
[
  { 
    "name": 'John Collins',
    "team": 'Atlanta Hawks',
    "games_played": 33,
    "points_per_game": 19.5,
    "field_goal_percentage": 59,
    "three_point_percentage": 40,
    "free_throw_percentage": 73,
    "rebounds_per_game": 10,
    "assists_per_game": 2.3,
    "steals_per_game": 0.3,
    "blocks_per_game": 0.33, 
    "created_at": "2019-01-30T21:40:44.311Z",
    "updated_at": "2019-01-30T21:40:44.311Z"
  },
  { 
    "name": 'Trae Young',
    "team": 'Atlanta Hawks',
    "games_played": 49,
    "points_per_game": 16.4,
    "field_goal_percentage": 40,
    "three_point_percentage": 29,
    "free_throw_percentage": 81,
    "rebounds_per_game": 3.2,
    "assists_per_game": 7.3,
    "steals_per_game": 0.88,
    "blocks_per_game": 0.24, 
    "created_at": "2019-01-30T21:40:44.311Z",
    "updated_at": "2019-01-30T21:40:44.311Z" 
  },
  { 
    "name": 'Kent Bazemore',
    "team": 'Atlanta Hawks',
    "games_played": 35,
    "points_per_game": 14,
    "field_goal_percentage": 44,
    "three_point_percentage": 33,
    "free_throw_percentage": 75,
    "rebounds_per_game": 4,
    "assists_per_game": 2.6,
    "steals_per_game": 1.7,
    "blocks_per_game": 0.91, 
    "created_at": "2019-01-30T21:40:44.311Z",
    "updated_at": "2019-01-30T21:40:44.311Z"
  }
]
```
## GET a single team: 
```
GET /api/v1/teams/:id
```
Receive a single team object with stats.

Sample Response:
```
[
    {
        "id": 140,
        "team_name": "Toronto Raptors",
        "head_coach": "Nick Nurse",
        "owner": "Maple Leaf Sports and 
        Entertainment",
        "most_recent_championship": null,
        "defensive_rating": "107.5",
        "points_per_game": "114.1",
        "created_at": "2019-01-30T21:40:44.311Z",
        "updated_at": "2019-01-30T21:40:44.311Z"
    }
]
```
## GET a single player: 
```
GET /api/v1/players/:id
```
Receive a single player object with all stats.

Sample Response:
```
[
    {   
        "name": 'Kyrie Irving',
        "team": 'Boston Celtics',
        "games_played": 43,
        "points_per_game": 23.7,
        "field_goal_percentage": 49,
        "three_point_percentage": 41,
        "free_throw_percentage": 85,
        "rebounds_per_game": 4.8,
        "assists_per_game": 6.9,
        "steals_per_game": 1.7,
        "blocks_per_game": 0.47, 
        "created_at": "2019-01-30T21:40:44.311Z",
        "updated_at": "2019-01-30T21:40:44.311Z"
    }  
]
```

## POST a new team:
```
POST /api/v1/teams
```
Request should include a complete team with all necessary properties.

Sample Request:
```
{
  "team_name": "New Team",
  "head_coach": "Coach Person",
  "owner": "Owner Person",
  "most_recent_championship": null,
  "defensive_rating": 0.00,
  "points_per_game": 0.00
}
```

Recieve the id of the new entry.

Sample response: 
```
{
  "id": 150
}
```
## Post a new player: 
```
POST /api/v1/players
```

Request should include a complete player object with all necessary properties.

Sample Request: 
```
{
    "name": "Kobe Bryant", 
    "team": "Los Angeles Lakers", 
    "games_played": 81,
    "points_per_game": 35.6, 
    "field_goal_percentage": 45, 
    "three_point_percentage": 40, 
    "free_throw_percentage": 90,
    "rebounds_per_game": 6.1, 
    "assists_per_game": 2.4, 
    "steals_per_game": 2.2, 
    "blocks_per_game": 1.33
}
```


## PATCH an existing team:
```
PATCH /api/v1/teams/:id
```

Request should include any key/value pairs that are to be changed in the database.

Sample request body:
```
{
  "defensive_rating": 1000,
  "points_per_game": 400
}
```

Receive the id of the record that was updated and a confirmation message.

Sample response: 
```
"Team at id 139 has been updated"
```

## PATCH an existing player: 
```
PATCH /api/v1/players/:id
```
Request should include any key/value pairs that are to be changed on the database.

Sample request body:
```
{
    "games_played": 53, 
    "three_point_percentage": 35
}
``` 

Receive the id of the record that was updated and a confirmation message 

Sample response: 
```
"Player at id 200 has been updated"
```

## DELETE an existing team: 
```
DELETE /api/v1/teams/:id
```
Recieve a confirmation message or the record that was deleted.

Sample response: 
```
"Team at id 140 has been deleted"
```

## DELETE an existing player: 
```
DELETE /api/v1/players/:id
```
Receive a confirmation message for the record that was deleted. 

Sample response: 
```
"Player at id 300 has been deleted"
```
