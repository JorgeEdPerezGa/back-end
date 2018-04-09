module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mood_ring',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mood_ring_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
