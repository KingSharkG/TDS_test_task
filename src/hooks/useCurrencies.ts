import { useCallback, useEffect, useState } from 'react';
import { fetchCurrencies } from '../data';
import { Currency } from '../types';

interface UseCurrenciesResult {
  currencies: Currency[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useCurrencies = (): UseCurrenciesResult => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currencies = await fetchCurrencies();
      setCurrencies(currencies);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load currencies.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { currencies, isLoading, error, retry: load };
};
