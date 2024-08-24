const config = {
  development: {
    username: "root",
    password: null,
    database: "quanlyuser",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    query: {
      raw: true
    },
    timezone: '+07:00',
    logging: console.log, // Log all SQL queries
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};

module.exports = config;
