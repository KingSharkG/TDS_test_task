import { ApiCurrency, Currency } from '../types';

export const mapCurrencies = (apiCurrencies: ApiCurrency[]): Currency[] =>
  apiCurrencies
    .map((c) => ({ code: c.short_code, name: c.name }))
    .filter((c) => c.code && c.name)
    .sort((a, b) => a.code.localeCompare(b.code));
