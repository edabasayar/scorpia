import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const CFG = {
  google:   { icon: 'G', bg: '#FFF',     text: '#333' },
  apple:    { icon: '', bg: '#000',     text: '#FFF' },
  facebook: { icon: 'f', bg: '#1877F2', text: '#FFF' },
};

export default function SocialButton({ provider = 'google', onPress, label }) {
  const { icon, bg, text } = CFG[provider];
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bg }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.inner}>
        <Text style={[styles.icon, { color: text }]}>{icon}</Text>
        <Text style={[styles.label, { color: text }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60, borderRadius: 12.5, width: '100%',
    marginBottom: 12.5, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', paddingHorizontal: 20,
  },
  inner: { flexDirection: 'row', alignItems: 'center', gap: 12.5 },
  icon: { fontSize: 20, fontWeight: '700', width: 25, textAlign: 'center' },
  label: { fontSize: 17.5, fontWeight: '500' },
});