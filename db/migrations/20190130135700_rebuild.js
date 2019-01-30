exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('team_name');
      table.string('head_coach');
      table.string('owner');
      table.integer('most_recent_championship', null);
      table.decimal('defensive_rating', null);
      table.decimal('points_per_game', null);

      table.timestamps(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('team');
      table.integer('games_played', null);
      table.decimal('points_per_game', null);
      table.decimal('field_goal_percentage', null);
      table.decimal('three_point_percentage', null);
      table.decimal('free_throw_percentage', null);
      table.decimal('rebounds_per_game', null);
      table.decimal('assists_per_game', null);
      table.decimal('steals_per_game', null);
      table.decimal('blocks_per_game', null);
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
