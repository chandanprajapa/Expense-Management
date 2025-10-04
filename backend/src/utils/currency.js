
const fetch = require('node-fetch');

const RESTCOUNTRIES_URL =
  process.env.RESTCOUNTRIES_URL ||
  'https://restcountries.com/v3.1/all?fields=name,currencies,cca2,cca3';

const EXCHANGE_API_BASE =
  process.env.EXCHANGE_API_BASE ||
  'https://api.exchangerate-api.com/v4/latest';


let countriesCache = null;
let exchangeCache = {};
const CACHE_TTL = 1000 * 60 * 60; // 1 hour


async function fetchCountryCurrencies() {
  if (countriesCache) return countriesCache;
  const resp = await fetch(RESTCOUNTRIES_URL);
  if (!resp.ok) throw new Error(`REST Countries fetch failed: ${resp.status}`);
  countriesCache = await resp.json();
  return countriesCache;
}


async function getCurrenciesByCountryCode(countryCode) {
  if (!countryCode) return null;
  const code = countryCode.toUpperCase();
  const all = await fetchCountryCurrencies();
  const rec = all.find(
    (c) =>
      (c.cca2 && c.cca2.toUpperCase() === code) ||
      (c.cca3 && c.cca3.toUpperCase() === code)
  );
  if (!rec || !rec.currencies) return null;
  return Object.keys(rec.currencies);
}


async function fetchExchangeRates(baseCurrency) {
  const base = baseCurrency.toUpperCase();
  const now = Date.now();

 
  if (exchangeCache[base] && now - exchangeCache[base].timestamp < CACHE_TTL) {
    return exchangeCache[base].data;
  }

  const url = `${EXCHANGE_API_BASE}/${encodeURIComponent(base)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const txt = await resp.text().catch(() => null);
    throw new Error(`Exchange API failed: ${resp.status} ${txt || ''}`);
  }

  const data = await resp.json();

 
  exchangeCache[base] = { timestamp: now, data };
  return data;
}


async function convertCurrency(originalCurrency, targetCurrency, amount) {
  if (!originalCurrency || !targetCurrency)
    throw new Error('Missing currencies');

  const from = originalCurrency.toUpperCase();
  const to = targetCurrency.toUpperCase();
  const amt = parseFloat(amount);

  if (from === to) return amt;

  const data = await fetchExchangeRates(from);
  const rate = data?.rates?.[to];
  if (rate == null) throw new Error(`Rate not found for ${to} from ${from}`);
  return amt * rate;
}

module.exports = {
  fetchCountryCurrencies,
  getCurrenciesByCountryCode,
  fetchExchangeRates,
  convertCurrency,
};
