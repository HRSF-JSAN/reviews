// Update with your config settings.


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost' || 'myebdb.cfjkmwehvsue.us-west-1.rds.amazonaws.com',
      user: process.env.POSTGRES_USER || 'aj2016',
      password: '' || 'password',
      database: process.env.POSTGRES_DB || 'foodigo',
      port: 5432,
    },
    migrations: {
      directory: `${__dirname}/database/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/knex/seeds`,
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  // migrations: {
  //   tableName: 'knex_migrations'
  // }
  // }
};
