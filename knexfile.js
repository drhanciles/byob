// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useDefaultAsNull: true
  },

  test: {
    client: 'pg', 
    connection: 'postgres://localhost/test_byob', 
    migrations: {
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds/test'
    }, 
    useDefaultAsNull: true
  }, 

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
