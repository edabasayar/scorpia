import React, { useState } from 'react';
// Ekran düzeni oluşturmak (View), yazılar yazmak (Text), tasarımları şekillendirmek (StyleSheet),
// ekranın aşağı yukarı kaymasını sağlamak (ScrollView) ve tıklanabilir alanlar oluşturmak (TouchableOpacity) için malzemeleri alıyoruz.
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Telefonun üst kısmındaki çentiğin altına içeriğin girmesini engelleyen koruyucu dış katman.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfaların en üstünde duran "Geri Dön" butonlu başlık çubuğumuz.
import Header from '../components/Header';

// Kullanıcının e-posta, şifre ve şifre tekrarını yazacağı, bizim özel tasarladığımız girdi kutuları.
import CustomInput from '../components/CustomInput';

// Uygulama genelinde kullandığımız standart büyük buton bileşenimiz.
import CustomButton from '../components/CustomButton';

// Google, Facebook, Apple logosuyla hızlı kayıt olmayı sağlayan özel butonlarımız.
import { SocialButton } from '../components/SocialButton';

// Uygulamanın ortak renk paletini tutan merkez dosya.
import { colors } from '../theme/colors';

// 'navigation', kayıt başarılı olduğunda veya linklere tıklandığında başka bir ekrana geçmemizi sağlayan yönlendirici kumanda.
export default function RegisterScreen({ navigation }) {
  
  // --- HAFIZA KUTULARI (STATE YÖNETİMİ) ---
  // Kullanıcının kayıt formuna yazdığı bilgileri anlık olarak aklında tutan geçici hafıza alanları.
  const [email, setEmail] = useState(''); // Yazılan e-posta adresini tutar
  const [password, setPassword] = useState(''); // İlk yazılan şifreyi tutar
  const [confirm, setConfirm] = useState(''); // Doğrulama amacıyla tekrar yazılan şifreyi tutar
  const [agreed, setAgreed] = useState(false); // Gizlilik politikasının kabul edilme durumunu tutar (Başlangıçta edilmemiş/false)

  return (
    // 1. ADIM: Ekranın en dış çerçevesi ve arka plan rengi.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: En üstteki geri butonu barı. Tıklandığında geldiğimiz bir önceki sayfaya bizi geri fırlatır. */}
      <Header onBack={() => navigation.goBack()} />
      
      {/* 3. ADIM: Klavye açıldığında form elemanlarının altta kalıp gizlenmesini önleyen kaydırılabilir ana gövde. */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Sayfa başlıkları */}
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Sisteme kayıt olarak maceraya katıl.</Text>

        {/* 4. ADIM: Kullanıcı veri giriş alanları.
            - value: Kutunun içinde ne görüneceğini söyler (Hafıza kutumuzdaki bilgi).
            - onChangeText: Kullanıcı kutuya her harf yazdığında hafıza kutumuzu günceller.
            - secureTextEntry: Şifre alanlarında harfleri gizleyip nokta nokta (●●●) yapar.
            - keyboardType: E-posta girilirken klavyede otomatik '@' işaretinin çıkmasını sağlar. */}
        <CustomInput label="E-Posta Adresi" placeholder="E-posta adresinizi girin..." value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomInput label="Şifre" placeholder="Şifrenizi girin..." value={password} onChangeText={setPassword} secureTextEntry />
        <CustomInput label="Şifreyi Onayla" placeholder="Şifrenizi tekrar girin..." value={confirm} onChangeText={setConfirm} secureTextEntry />

        {/* 5. ADIM: Gizlilik Politikası Onay Satırı.
            Tıklandığında agreed durumunu tersine çevirir (Onaylıysa kaldırır, onaylı değilse tik atar). */}
        <TouchableOpacity style={styles.terms} onPress={() => setAgreed(!agreed)}>
          {/* Eğer agreed 'true' (yani onaylı) ise kutunun rengini mavi yapar ve içine tik işareti basar */}
          <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>Gizlilik politikamı kabul ediyorum</Text>
        </TouchableOpacity>

        {/* 6. ADIM: Kayıt Ol Butonu. Basıldığında "Hesap Başarıyla Oluşturuldu" (AccountCreated) onay ekranına geçişi tetikler. */}
        <CustomButton title="Kayıt Ol" onPress={() => navigation.navigate('AccountCreated')} style={{ marginBottom: 25 }} />

        {/* 7. ADIM: Alternatif kayıt yöntemleri için araya çekilen çizgili "veya" satırı */}
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>veya şununla kayıt ol</Text>
          <View style={styles.divider} />
        </View>

        {/* Sosyal Medya ile Kayıt Butonları */}
        <SocialButton provider="google" onPress={() => {}} label="Google ile devam et" />
        <SocialButton provider="apple" onPress={() => {}} label="Apple ile devam et" />
        <SocialButton provider="facebook" onPress={() => {}} label="Facebook ile devam et" />

        {/* 8. ADIM: En altta duran, zaten hesabı olanları giriş sayfasına geri gönderen küçük yazı linki */}
        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Zaten hesabın var mı? <Text style={styles.loginBold}>Giriş Yap</Text></Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Ekibin aldığı karar doğrultusunda sağ-sol iç boşluğunu tam 32px yaptık:
  scroll: { paddingHorizontal: 32, paddingBottom: 50 },
  
  // Başlık ve alt başlık yazı stilleri
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 30 },
  
  // Gizlilik politikası satır tasarımı. Elemanları yan yana dizer (row) ve aralarına 12.5 birim boşluk bırakır (gap).
  terms: { flexDirection: 'row', alignItems: 'center', gap: 12.5, marginBottom: 25 },
  
  // Onay kutusu tasarımı (Kare, köşeleri hafif yumuşatılmış çerçeve)
  checkbox: { width: 22.5, height: 22.5, borderRadius: 5, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  // Kutu seçildiğinde arka plan rengini uygulamanın ana rengiyle doldurur
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.white, fontSize: 14, fontWeight: '700' },
  
  // flex: 1 verilerek metnin ekranın kalan genişliğine sığması ve taşarsa alt satıra geçmesi sağlandı
  termsText: { fontSize: 16.5, color: colors.textSecondary, flex: 1 },
  
  // Çizgili "veya" alanı: İki adet esnek çizgi arasına yazıyı ortalayarak sıkıştırır.
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  divider: { flex: 1, height: 1.5, backgroundColor: colors.divider },
  dividerText: { marginHorizontal: 15, color: colors.textLight, fontSize: 16.5 },
  
  loginLink: { alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 16.5, color: colors.textSecondary },
  loginBold: { color: colors.primary, fontWeight: '700' }, // "Giriş Yap" kelimesini kalın ve renkli yapar.
}); 