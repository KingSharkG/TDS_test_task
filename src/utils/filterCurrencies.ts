import { Currency } from '../types';

export const filterCurrencies = (
  currencies: Currency[],
  query: string,
): Currency[] => {
  const q = query.trim().toLowerCase();
  if (!q) return currencies;
  return currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
  );
};
