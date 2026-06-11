import React, { useState } from 'react';
// Telefon ekranında kutular oluşturmak (View), yazılar yazmak (Text), stiller tasarlamak (StyleSheet),
// klavye açılınca ekranın aşağı yukarı kaymasını sağlamak (ScrollView) ve tıklanabilir alanlar yapmak (TouchableOpacity) için malzemeleri alıyoruz.
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Telefonun üst kısmındaki çentiğin altına içeriğin girmesini engelleyen koruyucu dış katman.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfaların en üstünde duran "Geri Dön" butonlu başlık çubuğumuz.
import Header from '../components/Header';

// Kullanıcının e-posta ve şifre yazacağı, bizim özel tasarladığımız girdi kutuları.
import CustomInput from '../components/CustomInput';

// Uygulama genelinde kullandığımız standart büyük buton bileşenimiz.
import CustomButton from '../components/CustomButton';

// Google, Facebook, Apple gibi platformlarla hızlı giriş yapmayı sağlayan özel logolu butonlarımız.
import SocialButton from '../components/SocialButton';

// Uygulamanın ortak renk paletini tutan merkez dosya.
import { colors } from '../theme/colors';

// 'navigation', butonlara basıldığında sayfalar arası geçiş yapmamızı sağlayan kumandamız.
export default function LoginScreen({ navigation }) {
  
  // --- HAFIZA KUTULARI (STATE YÖNETİMİ) ---
  // Kullanıcının ekrandaki kutulara yazdığı bilgileri anlık olarak aklında tutan geçici hafıza alanları.
  const [email, setEmail] = useState(''); // Yazılan e-posta adresini tutar (Başlangıçta boş)
  const [password, setPassword] = useState(''); // Yazılan şifreyi tutar (Başlangıçta boş)
  const [rememberMe, setRememberMe] = useState(false); // Beni hatırla kutusunun açık/kapalı durumunu tutar (Başlangıçta kapalı/false)

  return (
    // 1. ADIM: Ekranın en dış çerçevesi ve arka plan rengi.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: En üstteki geri butonu barı. Tıklandığında geldiğimiz bir önceki sayfaya bizi geri fırlatır. */}
      <Header onBack={() => navigation.goBack()} />
      
      {/* 3. ADIM: Klavye açıldığında form elemanlarının altta kalıp gizlenmesini önleyen kaydırılabilir ana gövde. */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Sayfa başlıkları */}
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Tekrar Hoş Geldin!</Text>

        {/* 4. ADIM: Kullanıcı veri giriş alanları.
            - value: Kutunun içinde ne görüneceğini söyler (Hafıza kutumuzdaki bilgi).
            - onChangeText: Kullanıcı kutuya her harf yazdığında hafıza kutumuzu günceller.
            - secureTextEntry: Şifre alanında harfleri gizleyip nokta nokta (●●●) yapar.
            - keyboardType: E-posta girilirken klavyede otomatik '@' işaretinin çıkmasını sağlar. */}
        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput label="Şifre" placeholder="Şifrenizi girin..." value={password} onChangeText={setPassword} secureTextEntry />

        {/* 5. ADIM: "Beni Hatırla" ve "Şifremi Unuttum" seçeneklerinin yan yana durduğu satır. */}
        <View style={styles.row}>
          {/* Tıklandığında Beni Hatırla durumunu tersine çevirir (Açıksa kapatır, kapalıysa açar) */}
          <TouchableOpacity style={styles.checkRow} onPress={() => setRememberMe(!rememberMe)}>
            {/* Eğer rememberMe 'true' (yani aktif) ise kutunun rengini mavi yapar ve içine tik işareti basar */}
            <View style={[styles.checkbox, rememberMe && styles.checkboxOn]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Beni hatırla</Text>
          </TouchableOpacity>
          
          {/* Şifremi unuttum yazısı: Tıklandığında şifre sıfırlama ekranına gönderir */}
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>

        {/* 6. ADIM: Giriş Yap Butonu. Basıldığında kullanıcının profil sayfasına geçişi tetikler. */}
        <CustomButton title="Giriş Yap" onPress={() => navigation.navigate('Profile')} style={{ marginBottom: 25 }} />

        {/* 7. ADIM: Alternatif giriş yöntemleri için araya çekilen çizgili "veya" satırı */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>veya şununla giriş yap</Text>
          <View style={styles.divider} />
        </View>

        {/* Sosyal Medya ile Giriş Butonları */}
        <SocialButton provider="google" onPress={() => {}} label="Google ile devam et" />
        <SocialButton provider="apple" onPress={() => {}} label="Apple ile devam et" />
        <SocialButton provider="facebook" onPress={() => {}} label="Facebook ile devam et" />

        {/* 8. ADIM: En altta duran, hesabı olmayanları kayıt sayfasına yönlendiren küçük yazı linki */}
        <TouchableOpacity style={styles.regLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.regText}>Hesabın yok mu? <Text style={styles.regBold}>Kayıt Ol!</Text></Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Ekibinin aldığı karar doğrultusunda sağ-sol iç boşluğunu tam 32px yaptık:
  scroll: { paddingHorizontal: 32, paddingBottom: 50 },
  
  // Başlık ve alt başlık yazı stilleri
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 30 },
  
  // Elemanları yan yana dizmek için flexDirection: 'row' kullanıyoruz.
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22.5 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  
  // Beni hatırla boş kutu tasarımı (Kare, köşeleri hafif yumuşatılmış çerçeve)
  checkbox: { width: 22.5, height: 22.5, borderRadius: 5, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  // Kutu seçildiğinde arka plan rengini uygulamanın ana rengiyle doldurur
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '700' },
  
  rememberText: { fontSize: 16.5, color: colors.textSecondary },
  forgotText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
  
  // Çizgili "veya" alanı: İki adet esnek çizgi (flex: 1 olan iki kutu) arasına yazıyı sıkıştırır.
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  divider: { flex: 1, height: 1.5, backgroundColor: colors.divider },
  dividerText: { marginHorizontal: 15, color: colors.textLight, fontSize: 16.5 },
  
  regLink: { alignItems: 'center', marginTop: 20 },
  regText: { fontSize: 16.5, color: colors.textSecondary },
  regBold: { color: colors.primary, fontWeight: '700' }, // "Kayıt Ol!" kelimesini kalın ve renkli yapar.
}); 