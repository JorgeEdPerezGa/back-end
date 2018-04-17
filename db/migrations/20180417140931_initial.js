exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.integer('token_number');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('daily_totals', function(table) {
      table.increments('id').primary();
      table.string('current_date');
      table.string('week_start_date');
      table.integer('daily_total');
      table.integer('user_id').unsigned();
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('daily_totals'),
    knex.schema.dropTable('users')
  ]);
};