import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { colors } from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Sisteme kayıt olarak maceraya katıl.</Text>
        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput label="Şifre" placeholder="Şifrenizi girin..." value={password} onChangeText={setPassword} secureTextEntry />
        <CustomInput label="Şifreyi Onayla" placeholder="Şifrenizi tekrar girin..." value={confirm} onChangeText={setConfirm} secureTextEntry />
        <TouchableOpacity style={styles.terms} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>Gizlilik politikamı kabul ediyorum</Text>
        </TouchableOpacity>
        <CustomButton title="Kayıt Ol" onPress={() => navigation.navigate('AccountCreated')} style={{ marginBottom: 25 }} />
        <View style={styles.dividerRow}>
          <View style={styles.divider} /><Text style={styles.dividerText}>veya şununla kayıt ol</Text><View style={styles.divider} />
        </View>
        <SocialButton provider="google" onPress={() => {}} label="Google ile devam et" />
        <SocialButton provider="apple" onPress={() => {}} label="Apple ile devam et" />
        <SocialButton provider="facebook" onPress={() => {}} label="Facebook ile devam et" />
        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Zaten hesabın var mı? <Text style={styles.loginBold}>Giriş Yap</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 32, paddingBottom: 50 },
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 30 },
  terms: { flexDirection: 'row', alignItems: 'center', gap: 12.5, marginBottom: 25 },
  checkbox: { width: 22.5, height: 22.5, borderRadius: 5, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '700' },
  termsText: { fontSize: 16.5, color: colors.textSecondary, flex: 1 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  divider: { flex: 1, height: 1.5, backgroundColor: colors.divider },
  dividerText: { marginHorizontal: 15, color: colors.textLight, fontSize: 16.5 },
  loginLink: { alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 16.5, color: colors.textSecondary },
  loginBold: { color: colors.primary, fontWeight: '700' },
});