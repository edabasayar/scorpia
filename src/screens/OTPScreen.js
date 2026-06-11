import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function OTPScreen({ navigation, route }) {
  const email = route?.params?.email || 'oyuncu@ornek.com';
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = useRef([]);

  const handleChange = (text, i) => {
    const next = [...otp];
    next[i] = text;
    setOtp(next);
    if (text && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.title}>Doğrulama</Text>
        <Text style={styles.subtitle}>Devam etmek için kodu girin.</Text>
        <View style={styles.illus}>
          <Text style={styles.illusEmoji}>✉️</Text>
        </View>
        <Text style={styles.sentTo}>Kodu şu adrese gönderdik:{'\n'}<Text style={styles.email}>{email}</Text></Text>
        <View style={styles.otpRow}>
          {otp.map((d, i) => (
            <TextInput
              key={i}
              ref={r => (refs.current[i] = r)}
              style={[styles.otpInput, d ? styles.otpFilled : null]}
              value={d}
              onChangeText={t => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Kodu alamadın mı? <Text style={styles.resendBold}>Tekrar Gönder</Text></Text>
        </TouchableOpacity>
        <CustomButton title="Devam Et" onPress={() => navigation.navigate('NewPassword')} style={{ marginBottom: 20 }} />
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>← Giriş Ekranına Dön</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 30, paddingTop: 10 },
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 25 },
  illus: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, paddingVertical: 28, marginBottom: 25 },
  illusEmoji: { fontSize: 64 },
  sentTo: { fontSize: 16.5, color: colors.textSecondary, marginBottom: 35, lineHeight: 25, textAlign: 'center' },
  email: { fontWeight: '600', color: colors.primary },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, gap: 15 },
  otpInput: { flex: 1, height: 75, borderRadius: 15, backgroundColor: colors.lightBlue, borderWidth: 1.5, borderColor: colors.border, fontSize: 30, fontWeight: '700', color: colors.textPrimary },
  otpFilled: { borderColor: colors.primary, backgroundColor: colors.white },
  resend: { alignItems: 'center', marginBottom: 30 },
  resendText: { fontSize: 16.5, color: colors.textSecondary },
  resendBold: { color: colors.primary, fontWeight: '700' },
  backText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
});
