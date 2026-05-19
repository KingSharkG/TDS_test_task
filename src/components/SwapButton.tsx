import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

interface SwapButtonProps {
  onPress: () => void;
}

export const SwapButton = ({ onPress }: SwapButtonProps) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      hitSlop={8}
      accessibilityLabel="Swap currencies"
    >
      <Text style={styles.icon}>⇅</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 20, color: colors.primaryText, fontWeight: '700' },
});
