const knex = require("./db");

const TABLE = "fidelity_orders_top30";

const insertTop30Rows = async (data) => {
  if (!data) {
    return;
  }
  try {
    await knex(TABLE).insert(data).onConflict(["symbol", "date"]).merge();
  } catch (err) {
    console.error("Error inserting top30 rows", err);
  }
};

module.exports = {
  insertTop30Rows,
};
