import React, { useState } from 'react';
// Kutular (View), yazılar (Text), stiller (StyleSheet), kaydırma alanı (ScrollView) ve tıklanabilir alanlar (TouchableOpacity) için gerekli malzemeler dahil edildi.
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// İçeriği ekran çentiklerinden koruyan güvenli alan katmanı.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfanın en üstünde duran ortak başlık çubuğu bileşeni.
import Header from '../components/Header';

// Kullanıcının şifrelerini yazacağı özel tasarım girdi kutusu bileşenleri.
import CustomInput from '../components/CustomInput';

// Uygulama genelinde kullanılan standart buton bileşeni.
import CustomButton from '../components/CustomButton';

// Renklerin tek bir merkezden yönetilmesini sağlayan ortak tema renk dosyası.
import { colors } from '../theme/colors';

// 'navigation' parametresi, işlem sonunda diğer ekranlara geçişi sağlayan yönlendirici yapıdır.
export default function NewPasswordScreen({ navigation }) {
  
  // --- HAFIZA KUTULARI (STATE YÖNETİMİ) ---
  // Girilen yeni şifreyi ve şifre tekrarını anlık olarak hafızada tutan değişkenler.
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    // 1. ADIM: Ekranın en dış çerçevesi ve arka plan renk ayarı.
    <SafeAreaView style={styles.safe}>
      
      {/* En üstteki geri butonu barı. Tıklandığında gelinen bir önceki sayfaya (OTP ekranına) geri yönlendirir. */}
      <Header onBack={() => navigation.goBack()} />
      
      {/* 2. ADIM: Klavye açıldığında elemanların gizlenmesini önleyen kaydırılabilir ana gövde. */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Güvenlik vurgusunu artırmak amacıyla yerleştirilen kilit emojili görsel alan */}
        <View style={styles.lockBox}>
          <Text style={styles.lock}>🔒</Text>
        </View>
        
        {/* Sayfa başlıkları */}
        <Text style={styles.title}>Yeni Şifre Belirle</Text>
        <Text style={styles.subtitle}>Benzersiz bir şifre oluştur.</Text>
        
        {/* 3. ADIM: Şifre Girdi Alanları.
            - secureTextEntry: Yazılan karakterleri gizleyip nokta nokta (●●●) yapmak için kullanılır. */}
        <CustomInput label="Yeni Şifre" placeholder="Yeni şifrenizi girin..." value={newPass} onChangeText={setNewPass} secureTextEntry />
        <CustomInput label="Şifre Tekrar" placeholder="Şifrenizi tekrar girin..." value={confirm} onChangeText={setConfirm} secureTextEntry />
        
        {/* 4. ADIM: Şifreyi Sıfırla Butonu. 
            Basıldığında işlemin başarıyla bittiğini gösteren 'PasswordChanged' (Şifre Değiştirildi) onay ekranına yönlendirir. */}
        <CustomButton title="Şifreyi Sıfırla" onPress={() => navigation.navigate('PasswordChanged')} style={{ marginTop: 10, marginBottom: 25 }} />
        
        {/* İşlemi ertelemek ve çıkış yapmak isteyen kullanıcılar için tasarlanan iptal linki */}
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.regBold}>Şifreyi daha sonra sıfırla!</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Arka plan rengini projenin genel temasına eşitler.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Belirlenen tasarım standardı doğrultusunda sağ-sol iç boşluğu tam 32px olarak ayarlandı.
  scroll: { paddingHorizontal: 32, paddingBottom: 50 },
  
  // Başlık yazı stilleri
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 30 },
  
  // Kilit emojisinin yer aldığı kutunun görsel yerleşim ve yuvarlatma ayarları
  lockBox: { alignItems: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, paddingVertical: 30, marginBottom: 25 },
  lock: { fontSize: 75 },
  
  // En alttaki vazgeçme linkinin boyut, kalınlık ve renk ayarı
  regBold: { fontSize: 16.5, color: colors.primary, fontWeight: '700' },
}); 