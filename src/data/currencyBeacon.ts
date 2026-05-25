import axios from 'axios';
import { ConvertResponse, CurrenciesResponse, Currency } from '../types';
import { mapCurrencies } from './mappers';

const API_KEY = process.env.EXPO_PUBLIC_CURRENCYBEACON_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_CURRENCYBEACON_API_URL;

const client = axios.create({
  baseURL: API_URL,
});

const fetchData = async <T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> => {
  if (!API_KEY || !API_URL) {
    throw new Error(
      'Missing API config. Copy .env.example to .env and set EXPO_PUBLIC_CURRENCYBEACON_API_KEY and EXPO_PUBLIC_CURRENCYBEACON_API_URL.',
    );
  }

  try {
    const { data } = await client.get<T>(path, {
      params: { api_key: API_KEY, ...params },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Request failed (${error.response.status}). Check your API key and try again.`,
        );
      }
      throw new Error('Network error. Check your connection and try again.');
    }
    throw error;
  }
};

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const data = await fetchData<CurrenciesResponse>('/currencies');

  return mapCurrencies(data.response);
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number,
): Promise<ConvertResponse['response']> => {
  const data = await fetchData<ConvertResponse>('/convert', {
    from,
    to,
    amount: String(amount),
  });

  return data.response;
};
