const knex = require("knex")({
  client: process.env.DB_TYPE || "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  },
});
module.exports = knex;
