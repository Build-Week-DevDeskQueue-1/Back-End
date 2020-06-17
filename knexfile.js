// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/db.sqlite3'
    },

    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
   
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
