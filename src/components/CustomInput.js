import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function CustomInput({
  label, placeholder, value, onChangeText,
  secureTextEntry = false, keyboardType = 'default',
  autoCapitalize = 'none', style,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !visible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eye}>
            <View style={styles.eyeIcon}>
              <View style={[styles.eyeOuter, visible && styles.eyeOuterOpen]} />
              {!visible && <View style={styles.eyeLine} />}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 17.5, width: '100%' },
  label: { fontSize: 16.5, fontWeight: '600', color: colors.textPrimary, marginBottom: 7.5 },
  wrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.accent, borderRadius: 12.5,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 17.5, height: 60,
  },
  input: { flex: 1, fontSize: 17.5, color: colors.textPrimary },
  eye: { padding: 7.5 },
  eyeIcon: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center' },
  eyeOuter: {
    width: 22.5, height: 15, borderRadius: 11.5,
    borderWidth: 2, borderColor: colors.secondary,
  },
  eyeOuterOpen: { borderColor: colors.primary },
  eyeLine: {
    position: 'absolute', width: 25, height: 2.5,
    backgroundColor: colors.secondary,
    transform: [{ rotate: '45deg' }],
  },
});