import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Tekrar Hoş Geldin!</Text>

        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput label="Şifre" placeholder="Şifrenizi girin..." value={password} onChangeText={setPassword} secureTextEntry />

        <View style={styles.row}>
          <TouchableOpacity style={styles.checkRow} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxOn]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Beni hatırla</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton title="Giriş Yap" onPress={() => navigation.navigate('Profile')} style={{ marginBottom: 25 }} />

        <View style={styles.dividerRow}>
          <View style={styles.divider} /><Text style={styles.dividerText}>veya şununla giriş yap</Text><View style={styles.divider} />
        </View>

        <SocialButton provider="google" onPress={() => {}} label="Google ile devam et" />
        <SocialButton provider="apple" onPress={() => {}} label="Apple ile devam et" />
        <SocialButton provider="facebook" onPress={() => {}} label="Facebook ile devam et" />

        <TouchableOpacity style={styles.regLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.regText}>Hesabın yok mu? <Text style={styles.regBold}>Kayıt Ol!</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 30, paddingBottom: 50 },
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 30 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22.5 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: { width: 22.5, height: 22.5, borderRadius: 5, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '700' },
  rememberText: { fontSize: 16.5, color: colors.textSecondary },
  forgotText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  divider: { flex: 1, height: 1.5, backgroundColor: colors.divider },
  dividerText: { marginHorizontal: 15, color: colors.textLight, fontSize: 16.5 },
  regLink: { alignItems: 'center', marginTop: 20 },
  regText: { fontSize: 16.5, color: colors.textSecondary },
  regBold: { color: colors.primary, fontWeight: '700' },
});
