require("dotenv").config();
const ordersService = require("./src/top30Service");
const api = require("./src/fetchOrders");

async function main() {
  try {
    const data = await api.getTopOrders();
    await ordersService.insertTop30Rows(data);
    process.exit(0);
  } catch (err) {
    console.error("Uncaught exception", err);
    process.exit(1);
  }
}

main();
