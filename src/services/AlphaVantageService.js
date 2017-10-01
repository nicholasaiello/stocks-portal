import { DEBUG } from '../constants/Env';
import { API_KEY } from '../constants/AlphaVantage';


const AlphaVantageService = (ctx) => {

  const TTL = (DEBUG ? 60 * 5 : 30) * 1000;  // 30 seconds;

  const baseUrl = (symbol, func = 'TIME_SERIES_INTRADAY') => (
    `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${API_KEY}`
  );

  const cacheKey = (v) => (
    `av:s:${v}`
  );

  const isCacheExpired = (obj) => {
    const created = new Date(obj._created),
      delta = ((+new Date) - created.getTime());

    console.debug('delta', delta);
    return delta > TTL;
  };

  const parseResp = function(json) {
    let meta = json['Meta Data'] || false;

    if (meta) {
      let symbol = meta['2. Symbol'],
        lastUpdate = meta['3. Last Refreshed'],
        lastTick = json['Time Series (1min)'][lastUpdate];

      const quote = {
        symbol: symbol,
        price: parseFloat(lastTick['4. close']),
        ts: lastUpdate,
        '_created': (new Date()).toJSON()
      };

      window.localStorage.setItem(cacheKey(symbol), JSON.stringify(quote));

      return quote;
    }
    return null;
  }.bind(ctx);

  const fetchJson = function(symbol, func = 'TIME_SERIES_INTRADAY') {
    const quote = JSON.parse(window.localStorage.getItem(cacheKey(symbol)));

    if (!quote || isCacheExpired(quote)) {
      return fetch(baseUrl(symbol, func), {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((json) => {
        return parseResp(json);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(quote);
      }, 500);
    });

  }.bind(ctx);

  return {
    url: baseUrl,
    fetchJson: fetchJson
  };

};

export default AlphaVantageService;
