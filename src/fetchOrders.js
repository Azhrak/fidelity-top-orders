const axios = require("axios");
const luxon = require("luxon");

const fidelityApi = {
  topOrders:
    "https://digital.fidelity.com/prgw/digital/research/api/top-orders",
  tokens: "https://digital.fidelity.com/prgw/digital/research/api/tokens",
};

const getTopOrders = async () => {
  try {
    const headers = await getTokenAndCookieHeaders();
    const { data } = await axios.post(
      fidelityApi.topOrders,
      { pageNum: 30 },
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );
    const date = luxon.DateTime.fromFormat(
      data.timestamp.match(/(\w{3}-\d{2}-\d{4})/)[1],
      "LLL-dd-yyyy"
    );
    return data.orders.map((order, rank) => {
      return {
        date: date.toJSDate(),
        rank: rank + 1,
        symbol: order.symbol,
        priceChangePercentage: order.todaysChgPct,
        buys: parseInt(order.buyOrderTotal.replace(/,/g, ""), 10),
        buysPercentage: order.buysPct,
        sells: parseInt(order.sellOrderTotal.replace(/,/g, ""), 10),
        sellsPercentage: order.sellsPct,
      };
    });
  } catch (err) {
    console.error("Error fetching top orders from API.", err);
    return [];
  }
};

const getTokenAndCookieHeaders = async () => {
  const { data, headers } = await axios.get(fidelityApi.tokens, {
    withCredentials: true,
  });
  const appId = data.client.meta.appName.split("-").shift();
  const cookies = headers["set-cookie"].map((cookie) => {
    return cookie.split(";").shift();
  });
  return {
    [`${appId}-csrf-token`]: data.csrfToken,
    cookie: cookies.join("; "),
  };
};

module.exports = {
  getTopOrders,
};
