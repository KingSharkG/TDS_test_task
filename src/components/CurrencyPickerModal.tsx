import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Currency } from '../types';
import { colors, radius } from '../theme';
import { filterCurrencies } from '../utils';

interface CurrencyPickerModalProps {
  visible: boolean;
  currencies: Currency[];
  selectedCode: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export const CurrencyPickerModal = ({
  visible,
  currencies,
  selectedCode,
  onSelect,
  onClose,
}: CurrencyPickerModalProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterCurrencies(currencies, query),
    [currencies, query],
  );

  const handleSelect = (code: string) => {
    onSelect(code);
    setQuery('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select currency</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.close}>Done</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.search}
          value={query}
          onChangeText={setQuery}
          placeholder="Search by code or name"
          placeholderTextColor={colors.textMuted}
          autoCorrect={false}
          autoCapitalize="characters"
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.empty}>No currencies match “{query}”.</Text>
          }
          renderItem={({ item }) => {
            const isSelected = item.code === selectedCode;
            return (
              <Pressable
                style={[styles.row, isSelected && styles.rowSelected]}
                onPress={() => handleSelect(item.code)}
              >
                <Text style={styles.rowCode}>{item.code}</Text>
                <Text style={styles.rowName} numberOfLines={1}>
                  {item.name}
                </Text>
                {isSelected && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  close: { fontSize: 16, fontWeight: '600', color: colors.primary },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: 12,
  },
  rowSelected: { backgroundColor: colors.background },
  rowCode: { fontSize: 16, fontWeight: '700', color: colors.text, width: 56 },
  rowName: { fontSize: 15, color: colors.textMuted, flex: 1 },
  check: { fontSize: 16, fontWeight: '700', color: colors.primary },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 32 },
});
