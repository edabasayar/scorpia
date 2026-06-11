import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Şifreni mi Unuttun?</Text>
        <Text style={styles.subtitle}>Endişelenme, hemen kurtaracağız.</Text>
        <View style={styles.illus}>
          <Text style={styles.illusEmoji}>✉️</Text>
          <Text style={styles.illusSub}>Kayıtlı e-posta adresinize doğrulama kodu göndereceğiz.</Text>
        </View>
        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomButton title="Kod Gönder" onPress={() => navigation.navigate('OTP', { email })} style={{ marginTop: 10, marginBottom: 25 }} />
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>← Giriş Ekranına Dön</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 30, paddingBottom: 50 },
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 35 },
  illus: { alignItems: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, padding: 30, marginBottom: 35 },
  illusEmoji: { fontSize: 70, marginBottom: 15 },
  illusSub: { fontSize: 16.5, color: colors.textSecondary, textAlign: 'center', lineHeight: 25 },
  back: { alignItems: 'center' },
  backText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
});
