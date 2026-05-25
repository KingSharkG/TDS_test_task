import { useEffect, useState } from 'react';
import { convertCurrency } from '../data';
import { useDebounce } from './useDebounce';

interface UseConversionResult {
  result: {
    value: number;
    timestamp: string;
  } | null;
  converting: boolean;
  error: string | null;
}

const DEBOUNCE_MS = 400;

export const useConversion = (
  from: string,
  to: string,
  amount: string,
): UseConversionResult => {
  const [result, setResult] = useState<{
    value: number;
    timestamp: string;
  } | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedAmount = useDebounce(amount, DEBOUNCE_MS);
  const numericAmount = Number(debouncedAmount);
  const isValidAmount = debouncedAmount.trim() !== '' && numericAmount > 0;

  const convert = async (isActive: () => boolean) => {
    try {
      const response = await convertCurrency(from, to, numericAmount);
      if (isActive()) setResult(response);
    } catch (e) {
      if (isActive()) {
        setResult(null);
        setError(e instanceof Error ? e.message : 'Conversion failed.');
      }
    } finally {
      if (isActive()) setConverting(false);
    }
  };

  useEffect(() => {
    if (!from || !to || !isValidAmount) {
      setResult(null);
      setError(null);
      setConverting(false);
      return;
    }

    let cancelled = false;
    setConverting(true);
    setError(null);

    convert(() => !cancelled);

    return () => {
      cancelled = true;
    };
  }, [from, to, numericAmount, isValidAmount]);

  return { result, converting, error };
};
