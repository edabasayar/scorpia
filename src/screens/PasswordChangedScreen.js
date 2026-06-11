import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function PasswordChangedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <Header onBack={() => navigation.navigate('Login')} />
      <View style={styles.container}>
        <View style={styles.circle}><Text style={styles.check}>✓</Text></View>
        <Text style={styles.title}>Şifre Değiştirildi!</Text>
        <Text style={styles.subtitle}>Şifreniz başarıyla sıfırlandı.</Text>
        <CustomButton title="Devam Et" onPress={() => navigation.navigate('Login')} style={{ width: '100%' }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center', paddingBottom: 75 },
  circle: { width: 175, height: 175, borderRadius: 87.5, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  check: { fontSize: 75, color: colors.white },
  title: { fontSize: 32.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 12.5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, textAlign: 'center', marginBottom: 50 },
});
