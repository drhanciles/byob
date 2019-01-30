exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', (table) => {
      table.dropColumn('defensive_rating');
      table.dropColumn('points_per_game');
    }),

    knex.schema.table('players', (table) => {
      table.dropColumn('games_played');
      table.dropColumn('points_per_game');
      table.dropColumn('field_goal_percentage');
      table.dropColumn('three_point_percentage');
      table.dropColumn('free_throw_percentage');
      table.dropColumn('rebounds_per_game');
      table.dropColumn('assists_per_game');
      table.dropColumn('steals_per_game');
      table.dropColumn('blocks_per_game');
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', (table) => {
      table.integer('defensive_rating');
      table.integer('points_per_game');
    }),

    knex.schema.table('players', (table) => {
      table.integer('games_played');
      table.integer('points_per_game');
      table.integer('field_goal_percentage');
      table.integer('three_point_percentage');
      table.integer('free_throw_percentage');
      table.integer('rebounds_per_game');
      table.integer('assists_per_game');
      table.integer('steals_per_game');
      table.integer('blocks_per_game');
    })
  ]); 
};
