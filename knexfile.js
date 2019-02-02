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
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds/dev'
    }, 
    useDefaultAsNull: true
  },
};
