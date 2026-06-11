import React, { useState } from 'react';
// Ekranda kutular oluşturmak (View), yazılar yazmak (Text), tasarımlar şekillendirmek (StyleSheet),
// ekranın aşağı yukarı kaymasını sağlamak (ScrollView) ve tıklanabilir alanlar oluşturmak (TouchableOpacity) için gerekli parçalar dahil edildi.
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Telefon ekranlarındaki üst çentiğin altına içeriğin girmesini engelleyen koruyucu dış katman.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfanın en üstünde duran, bir önceki ekrana dönmeyi sağlayan ortak başlık çubuğu bileşeni.
import Header from '../components/Header';

// Kullanıcının e-posta adresini yazacağı özel tasarım girdi kutusu bileşeni.
import CustomInput from '../components/CustomInput';

// Uygulama genelinde standart olarak kullanılan özel tasarım buton bileşeni.
import CustomButton from '../components/CustomButton';

// Renklerin tek bir merkezden yönetilmesini sağlayan ortak tema renk dosyası.
import { colors } from '../theme/colors';

// 'navigation' parametresi, butonlara basıldığında ekranlar arası geçişi sağlayan yönlendirici yapıdır.
export default function ForgotPasswordScreen({ navigation }) {
  
  // --- HAFIZA KUTUSU (STATE YÖNETİMİ) ---
  // Kullanıcının şifre sıfırlama için girdiği e-posta adresini anlık olarak hafızada tutan değişken.
  const [email, setEmail] = useState('');

  return (
    // 1. ADIM: Ekranın en dış çerçevesi. Telefonun durum çubuğunu korur ve arka plan rengini belirler.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: En üstteki geri butonu barı. Tıklandığında gelinen bir önceki sayfaya geri fırlatır. */}
      <Header onBack={() => navigation.goBack()} />
      
      {/* 3. ADIM: Klavye açıldığında elemanların gizlenmesini önleyen kaydırılabilir ana gövde. */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Sayfa başlıkları */}
        <Text style={styles.title}>Şifreni mi Unuttun?</Text>
        <Text style={styles.subtitle}>Endişelenme, hemen kurtaracağız.</Text>
        
        {/* 4. ADIM: Sayfanın daha anlaşılır olması için yerleştirilen, içinde emoji ve kısa mesaj barındıran bilgilendirme kutusu (İllüstrasyon alanı). */}
        <View style={styles.illus}>
          <Text style={styles.illusEmoji}>✉️</Text>
          <Text style={styles.illusSub}>Kayıtlı e-posta adresinize doğrulama kodu göndereceğiz.</Text>
        </View>
        
        {/* 5. ADIM: Kullanıcının e-posta adresini gireceği alan. 
            - keyboardType="email-address": Klavyede otomatik olarak '@' işaretinin çıkmasını sağlar. */}
        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        
        {/* 6. ADIM: Kod Gönder Butonu.
            - onPress: Basıldığında 'OTP' (Kod Doğrulama) ekranına geçişi tetikler. 
            - { email } satırı: Kullanıcının yazdığı e-posta adresini bir sonraki ekrana bilgi olarak taşır (böylece OTP ekranında bu e-postayı gösterebiliriz). */}
        <CustomButton title="Kod Gönder" onPress={() => navigation.navigate('OTP', { email })} style={{ marginTop: 10, marginBottom: 25 }} />
        
        {/* 7. ADIM: En altta duran, işlemi iptal edip giriş ekranına geri dönmek isteyenler için tasarlanan yazı linki. */}
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>← Giriş Ekranına Dön</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Ekranın tamamını kaplatıp, rengini projenin genel arka plan rengiyle eşitler.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Belirlenen tasarım standardı doğrultusunda sağ-sol iç boşluğu tam 32px olarak güncellendi.
  scroll: { paddingHorizontal: 32, paddingBottom: 50 },
  
  // Başlık yazılarının boyut ve kalınlık ayarları.
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 35 },
  
  // Ortadaki emojili kutunun tasarımı: Açık mavi arka plan, yuvarlatılmış köşeler ve iç boşluklar uygulandı.
  illus: { alignItems: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, padding: 30, marginBottom: 35 },
  illusEmoji: { fontSize: 70, marginBottom: 15 },
  illusSub: { fontSize: 16.5, color: colors.textSecondary, textAlign: 'center', lineHeight: 25 },
  
  // Geri dönme linkinin ekranı ortalamasını ve belirgin bir renkte (birincil renk) görünmesini sağlayan ayarlar.
  back: { alignItems: 'center' },
  backText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
}); 