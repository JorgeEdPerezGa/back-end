exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('questions', function(table) {
      table.string('date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('questions', function(table) {
      table.dropColumn('date');
    })
  ]);
};