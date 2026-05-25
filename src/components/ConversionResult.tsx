import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';
import { formatValue } from '../utils';

interface ConversionResultProps {
  result?: number;
  converting: boolean;
  error: string | null;
  toCode: string;
}

export const ConversionResult = ({
  result,
  converting,
  error,
  toCode,
}: ConversionResultProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Converted amount</Text>

      {converting ? (
        <ActivityIndicator color={colors.primary} style={styles.body} />
      ) : error ? (
        <Text style={[styles.body, styles.error]}>{error}</Text>
      ) : !!result ? (
        <Text style={styles.value}>
          {formatValue(result)} <Text style={styles.valueCode}>{toCode}</Text>
        </Text>
      ) : (
        <Text style={[styles.body, styles.placeholder]}>
          Enter an amount to convert.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 6,
    minHeight: 100,
    justifyContent: 'center',
  },
  label: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  body: { marginTop: 4 },
  value: { fontSize: 30, fontWeight: '700', color: colors.text },
  valueCode: { fontSize: 18, fontWeight: '600', color: colors.textMuted },
  error: { color: colors.error, fontSize: 14 },
  placeholder: { color: colors.textMuted, fontSize: 14 },
});
