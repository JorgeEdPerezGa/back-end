module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mood_ring',
    migrations: {
      directory: './db/migrations'
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
