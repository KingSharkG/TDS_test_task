import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '../theme';

interface AmountInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export const AmountInput = ({ value, onChangeText }: AmountInputProps) => {
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const changedText =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;

    onChangeText(changedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor={colors.textMuted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
  },
});
