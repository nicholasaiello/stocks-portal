import { DEBUG } from '../constants/Env';
import { API_KEY } from '../constants/AlphaVantage';

// TODO move somewhere else
Date.prototype.stdTimezoneOffset = function() {
  let jan = new Date(this.getFullYear(), 0, 1),
    jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset()
};

const AlphaVantageService = (ctx) => {

  const TTL = (DEBUG ? 60 * 5 : 30) * 1000;  // 30 seconds;

  const baseUrl = (symbol, func = 'TIME_SERIES_INTRADAY') => (
    `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=1min&apikey=${API_KEY}`
  );

  const createCacheKey = (v) => (
    `av:s:${v}`
  );

  const isCacheExpired = (obj) => {
    const created = new Date(obj._created),
      delta = ((+new Date) - created.getTime());

    return delta > TTL;
  };

  const parseResp = function(json) {
    let meta = json['Meta Data'] || false;

    if (meta) {
      const now = new Date();
      const symbol = meta['2. Symbol'],
        lastUpdate = meta['3. Last Refreshed'],
        lastTick = json['Time Series (1min)'][lastUpdate];

      let quote = {
        symbol: symbol,
        price: parseFloat(lastTick['4. close']),
        ts: lastUpdate,
        '_created': now.toJSON()
      };

      window.localStorage.setItem(createCacheKey(symbol), JSON.stringify(quote));

      // FIXME: api uses US/Eastern. hard-code for now
      quote.ts = new Date(lastUpdate + ' E' + (now.dst() ? 'D' : 'S') + 'T');

      return quote;
    }
    return null;
  }.bind(ctx);

  const fetchJson = function(symbol, func = 'TIME_SERIES_INTRADAY') {
    const quote = JSON.parse(window.localStorage.getItem(createCacheKey(symbol)));

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
        const now = new Date();
        quote.ts = new Date(quote.ts + ' E' + (now.dst() ? 'D' : 'S') + 'T');
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
