import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AmountInput,
  ConversionResult,
  CurrencySelector,
  SwapButton,
} from '../components';
import { useConversion, useCurrencies } from '../hooks';
import { colors, radius } from '../theme';
import { pickDefault } from '../utils';
import { ConversionHistoryItem } from '../types';
import HistoryItem from '../components/HistoryItem';

export const CurrencyConverterScreen = () => {
  const { currencies, isLoading, error, retry } = useCurrencies();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('1');

  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const {
    result,
    converting,
    error: convertError,
  } = useConversion(from, to, amount);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    if (currencies.length === 0 || from || to) return;
    const codes = currencies.map((c) => c.code);

    const pickedFrom = pickDefault(codes, 'USD', 0);
    const pickedTo = pickDefault(codes, 'EUR', 1);

    setFrom(pickedFrom);
    setTo(pickedTo);
  }, [currencies, from, to]);

  useEffect(() => {
    if (!result) return;

    const historyItem: ConversionHistoryItem = {
      id: `${result.timestamp}-${result.value}-${amount}`,
      fromCurrency: from,
      toCurrency: to,
      fromAmount: amount,
      result: result.value,
    };

    const newHistory = [historyItem, ...history].slice(0, 5);

    setHistory(newHistory);
  }, [result]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.centeredText}>Loading currencies…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <AmountInput value={amount} onChangeText={setAmount} />

      <View style={styles.selectorRow}>
        <CurrencySelector
          label="From"
          currencies={currencies}
          selectedCode={from}
          onChange={setFrom}
        />
        <SwapButton onPress={swap} />
        <CurrencySelector
          label="To"
          currencies={currencies}
          selectedCode={to}
          onChange={setTo}
        />
      </View>

      <ConversionResult
        result={result?.value}
        converting={converting}
        error={convertError}
        toCode={to}
      />

      <View>
        <FlatList
          data={history}
          ListHeaderComponent={
            <View style={styles.historyTitle}>
              <Text>From</Text>
              <Text>To</Text>
            </View>
          }
          renderItem={({ item }) => <HistoryItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 18 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  centeredText: { color: colors.textMuted, fontSize: 15 },
  errorText: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radius,
  },
  retryText: { color: colors.primaryText, fontWeight: '700', fontSize: 15 },
  historyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
