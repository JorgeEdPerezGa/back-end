exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('user_email');
      table.string('username');
      table.string('password');
      table.boolean('push_notifications_on');
      table.string('notification_time');
      table.string('primary_contact_name');
      table.string('primary_contact_email');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('how_do_you_feel_morning');
      table.string('anything_to_look_forward_to');
      table.string('did_you_exercise');
      table.string('did_you_take_medicine');
      table.string('how_do_you_feel_night');

      table.integer('user_id').unsigned();
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('questions')
  ]);
};
