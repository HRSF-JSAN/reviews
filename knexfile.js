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
};
