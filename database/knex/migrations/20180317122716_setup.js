exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('restaurants', (table) => {
      table.integer('restaurant_id').primary();
      table.string('restaurant_name');
    }),
    knex.schema.createTable('users', (table) => {
      table.integer('user_id').primary();
      table.string('username');
      table.string('user_location');
      table.integer('user_friends');
      table.string('user_photo');
    }),
    knex.schema.createTable('reviews', (table) => {
      table.integer('review_id').primary();
      table.integer('user_id');
      table.integer('restaurant_id');
      table.integer('rating');
      table.string('date');
      table.string('review_body', 500);
      table.string('useful');
      table.string('funny');
      table.string('cool');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('reviews'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('restaurants'),
  ]);
};
