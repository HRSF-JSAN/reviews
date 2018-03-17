
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('restaurants', (table) => {
      table.increments('restaurant_id').primary();
      table.string('restuarant_name');
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('username');
      table.string('user_location');
      table.integer('user_friends');
      table.integer('user_reviews');
      table.string('user_photo');
    }),
    knex.schema.createTable('reviews', (table) => {
      table.increments('review_id').primary();
      table.integer('user_id').unsigned()
        .references('users.user_id');
      table.integer('restaurant_id').unsigned()
        .references('restaurants.restaurant_id');
      table.integer('rating');
      table.date('date');
      table.string('review_body');
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
