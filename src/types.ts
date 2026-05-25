export interface Currency {
  code: string;
  name: string;
}

export interface ApiCurrency {
  short_code: string;
  name: string;
}

export interface CurrenciesResponse {
  response: ApiCurrency[];
}

export interface ConvertResponse {
  response: {
    from: string;
    to: string;
    amount: number;
    value: number;
    timestamp: string;
  };
}

export interface ConversionHistoryItem {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  result: number;
}
