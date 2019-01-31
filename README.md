# Fantasy Basketball API

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
        "owner": "Maple Leaf Sports and Entertainment",
        "most_recent_championship": null,
        "defensive_rating": "107.5",
        "points_per_game": "114.1",
        "created_at": "2019-01-30T21:40:44.311Z",
        "updated_at": "2019-01-30T21:40:44.311Z"
    }
]
```

## POST a new team:
```
POST /api/v1/teams
```
Request should include a complete team with all necessary properties

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

Receive the id and a confirmation message.

Sample response: 
```
"Team at id 139 updated"
```

## DELETE an existing team: 
```
DELETE /api/v1/teams/:id
```
Recieve a confirmation message.

Sample response: 
```
"Team at id 140 deleted"
```