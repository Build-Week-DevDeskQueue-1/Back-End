
exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
    table.increments();
    table.text('username').notNullable();
    table.text('password').notNullable();
    table.text('is_helper').notNullable();
    table.text('is_student').notNullable();
  })
  .createTable('tickets', table => {
    table.increments();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.text('tried').notNullable();
    table.text('category').notNullable();
    table.integer('student_id').notNullable().references('users.id');
    table.integer('helper_id').references('users.id')
    table.boolean('is_open').notNullable().defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
  .dropTableIfExists('tickets')
};