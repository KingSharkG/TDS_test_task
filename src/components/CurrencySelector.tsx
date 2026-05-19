import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Currency } from '../types';
import { colors, radius } from '../theme';
import { CurrencyPickerModal } from './CurrencyPickerModal';

interface CurrencySelectorProps {
  label: string;
  currencies: Currency[];
  selectedCode: string;
  onChange: (code: string) => void;
}

export const CurrencySelector = ({
  label,
  currencies,
  selectedCode,
  onChange,
}: CurrencySelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selected = currencies.find((c) => c.code === selectedCode);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.field} onPress={() => setModalVisible(true)}>
        <View>
          <Text style={styles.code}>{selectedCode || 'Select'}</Text>
          {selected && (
            <Text style={styles.name} numberOfLines={1}>
              {selected.name}
            </Text>
          )}
        </View>
        <Text style={styles.chevron}>▾</Text>
      </Pressable>

      <CurrencyPickerModal
        visible={modalVisible}
        currencies={currencies}
        selectedCode={selectedCode}
        onSelect={onChange}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 60,
  },
  code: { fontSize: 18, fontWeight: '700', color: colors.text },
  name: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  chevron: { fontSize: 14, color: colors.textMuted },
});
