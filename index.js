require("dotenv").config();
const ordersService = require("./src/top30Service");
const scrape = require("./src/scrape");

async function main() {
  try {
    const data = await scrape.scrapeTop30();
    await ordersService.insertTop30Rows(data);
    process.exit(0);
  } catch (err) {
    console.error("Uncaught exception", err);
    process.exit(1);
  }
}

main();
