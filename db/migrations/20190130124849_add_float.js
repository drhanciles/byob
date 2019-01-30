
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('teams', (table) => {
      table.decimal('defensive_rating', null);
      table.decimal('points_per_game', null);
    }),

    knex.schema.table('players', (table) => {
      table.decimal('games_played', null);
      table.decimal('points_per_game', null);
      table.decimal('field_goal_percentage', null);
      table.decimal('three_point_percentage', null);
      table.decimal('free_throw_percentage', null);
      table.decimal('rebounds_per_game', null);
      table.decimal('assists_per_game', null);
      table.decimal('steals_per_game', null);
      table.decimal('blocks_per_game', null);
    })
  ])
};

exports.down = function(knex, Promise) {
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
  ])
};
