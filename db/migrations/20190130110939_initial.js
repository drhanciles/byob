
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('team_name');
      table.string('head_coach');
      table.string('owner');
      table.integer('most_recent_championship');
      table.integer('defensive_rating');
      table.integer('points_per_game');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('team');
      table.integer('games_played');
      table.integer('points_per_game');
      table.integer('field_goal_percentage');
      table.integer('three_point_percentage');
      table.integer('free_throw_percentage');
      table.integer('rebounds_per_game');
      table.integer('assists_per_game');
      table.integer('steals_per_game');
      table.integer('blocks_per_game');
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')

      table.timestamps(true, true);
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('teams')
  ]);
};
