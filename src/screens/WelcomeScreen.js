import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.welcomeTitle}>Hoş Geldin</Text>
          <Text style={styles.welcomeSub}>Devam etmek için bir seçenek belirle.</Text>
        </View>
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/images/akreplogo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>SCORPIA</Text>
          <Text style={styles.tagline}>Sanal paranın gerçek yüzünü keşfet</Text>
        </View>
        <View style={styles.buttonArea}>
          <CustomButton title="Yeni Hesap Oluştur" onPress={() => navigation.navigate('Register')} />
          <View style={{ height: 15 }} />
          <CustomButton title="Zaten hesabım var" variant="outline" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 35, paddingBottom: 50, paddingTop: 25, justifyContent: 'space-between' },
  logoArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoCircle: { width: 137.5, height: 137.5, borderRadius: 69, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  logoImg: { width: 106.5, height: 106.5 },
  brandName: { fontSize: 30, fontWeight: '800', color: colors.primary, letterSpacing: 4, marginBottom: 10 },
  tagline: { fontSize: 16.5, fontWeight: '600', color: colors.textSecondary },
  titleArea: { marginBottom: 25 },
  welcomeTitle: { fontSize: 27.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  welcomeSub: { fontSize: 16.5, color: colors.textSecondary },
  buttonArea: { width: '100%' },
});