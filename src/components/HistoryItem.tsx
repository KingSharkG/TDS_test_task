import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConversionHistoryItem } from '../types';
import { colors } from '../theme';

const HistoryItem = ({ item }: { item: ConversionHistoryItem }) => {
  return (
    <View style={styles.container}>
      <Text>
        {item.fromCurrency} - {item.fromAmount}
      </Text>
      <Text>
        {item.toCurrency} - {item.result}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default HistoryItem;
