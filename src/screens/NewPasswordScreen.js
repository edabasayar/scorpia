import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function NewPasswordScreen({ navigation }) {
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.lockBox}><Text style={styles.lock}>🔒</Text></View>
        <Text style={styles.title}>Yeni Şifre Belirle</Text>
        <Text style={styles.subtitle}>Benzersiz bir şifre oluştur.</Text>
        <CustomInput label="Yeni Şifre" placeholder="Yeni şifrenizi girin..." value={newPass} onChangeText={setNewPass} secureTextEntry />
        <CustomInput label="Şifre Tekrar" placeholder="Şifrenizi tekrar girin..." value={confirm} onChangeText={setConfirm} secureTextEntry />
        <CustomButton title="Şifreyi Sıfırla" onPress={() => navigation.navigate('PasswordChanged')} style={{ marginTop: 10, marginBottom: 25 }} />
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.regBold}>Şifreyi daha sonra sıfırla!</Text>
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
  lockBox: { alignItems: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, paddingVertical: 30, marginBottom: 25 },
  lock: { fontSize: 75 },
  regBold: { fontSize: 16.5, color: colors.primary, fontWeight: '700' },
});
