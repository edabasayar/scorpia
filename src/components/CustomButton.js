import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';

export default function CustomButton({
  title, onPress, variant = 'primary', loading = false, style, textStyle,
}) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[styles.button, isPrimary && styles.primary, isOutline && styles.outline, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
        : <Text style={[styles.text, isPrimary && styles.textPrimary, isOutline && styles.textOutline, textStyle]}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { height: 65, borderRadius: 12.5, alignItems: 'center', justifyContent: 'center', width: '100%' },
  primary: { backgroundColor: colors.primary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  text: { fontSize: 20, fontWeight: '600' },
  textPrimary: { color: colors.white },
  textOutline: { color: colors.primary },
});