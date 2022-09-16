const axios = require("axios");
const cheerio = require("cheerio");

/*
  2022-09-16
  Looks like Fidelity changed the page from which orders are fetched.
  The page only displays 6 first symbols now, so fetching them from 
  the API directly is the better method.
*/

const url =
  "https://eresearch.fidelity.com/eresearch/gotoBL/fidelityTopOrders.jhtml";

const scrapeTop30 = async () => {
  try {
    const stocks = [];

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const tr = $("table#topOrdersTable tbody tr");
    const percentRegex = new RegExp(/\(([^\)]+%)\)/);

    const source = $(".top-orders .source")
      .text()
      .match(/(\d\d)\/(\d\d)\/(\d\d)/);
    const date = new Date(
      parseInt(source[3]) + 2000,
      parseInt(source[2]) - 1,
      parseInt(source[1])
    );

    tr.each((idx, el) => {
      const cells = $(el).find("td");
      if (cells.length < 7) {
        return;
      }
      const stock = {
        date,
        rank: Number($(cells[0]).find(".offScreen").text()),
        symbol: $(cells[1]).text(),
        company: $(cells[2]).text(),
        priceChange: parseFloat($(cells[3]).find(".offScreen").text()),
        priceChangePercentage: parseFloat(
          $(cells[3]).text().match(percentRegex)[1]
        ),
        buys: Number($(cells[4]).find(".offScreen").text()),
        sells: Number($(cells[6]).find(".offScreen").text()),
      };
      const totalOrders = stock.buys + stock.sells;
      stock.buysPercentage = Math.round((stock.buys / totalOrders) * 100);
      stock.sellsPercentage = Math.round((stock.sells / totalOrders) * 100);
      stocks.push(stock);
    });

    return stocks;
  } catch (err) {
    console.error("Error scraping data", err);
    return [];
  }
};

module.exports = {
  scrapeTop30,
};
