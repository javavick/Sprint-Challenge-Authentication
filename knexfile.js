const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  },
  migrations: {
    directory: "./database/migrations",
    tableName: "dbmigrations"
  },
  seeds: { directory: "./database/seeds" }
};

module.exports = {
  development: {
    ...sqlite,
    connection: { filename: "./database/auth.db3" }
  },
  test: {
    ...sqlite,
    connection: { filename: "./database/test.db3" }
  }
};
