import React, { useState, useRef } from 'react';
// Arayüz elemanları, yazı etiketleri, stiller, veri giriş kutuları ve tıklanabilir alanlar dahil edildi.
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// Ekran içeriğini telefon çentiklerinden koruyan güvenli alan katmanı.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfanın en üstünde duran, bir önceki ekrana dönmeyi sağlayan ortak başlık çubuğu bileşeni.
import Header from '../components/Header';

// Uygulama genelinde standart olarak kullanılan özel tasarım buton bileşeni.
import CustomButton from '../components/CustomButton';

// Renklerin tek bir merkezden yönetilmesini sağlayan ortak tema renk dosyası.
import { colors } from '../theme/colors';

// 'navigation' parametresi ekranlar arası geçişi sağlar; 'route' ise bir önceki ekrandan gelen verileri yakalamaya yarar.
export default function OTPScreen({ navigation, route }) {
  
  {/* Bir önceki ekrandan (ForgotPassword) gönderilen e-posta adresi yakalanır. 
      Eğer herhangi bir sebeple veri gelmemişse, uygulamanın çökmesini önlemek için varsayılan bir e-posta adresi atanır. */}
  const email = route?.params?.email || 'oyuncu@ornek.com';
  
  // 4 haneli doğrulama kodunun her bir rakamını ayrı ayrı hafızada tutmak için oluşturulan dizi (state).
  const [otp, setOtp] = useState(['', '', '', '']);
  
  // Kutular arası otomatik geçişi (odaklanmayı) yönetmek için her girdi kutusuna bir referans (kimlik) atayan yapı.
  const refs = useRef([]);

  // Kullanıcı kutuya her sayı yazdığında çalışan kontrol fonksiyonu
  const handleChange = (text, i) => {
    const next = [...otp]; // Mevcut kod dizisi kopyalanır
    next[i] = text;        // Sadece değiştirilen kutunun indeksi yeni yazılan sayı ile güncellenir
    setOtp(next);          // Hafıza güncellenir
    
    // Eğer kutuya bir sayı yazıldıysa ve son kutuda (3. indeks) değilsek, otomatik olarak bir sonraki kutuya odaklanma (focus) yapılır.
    if (text && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    // 1. ADIM: Ekranın en dış çerçevesi ve arka plan renk ayarı.
    <SafeAreaView style={styles.safe}>
      
      {/* En üstteki geri butonu barı. Tıklandığında gelinen bir önceki sayfaya geri yönlendirir. */}
      <Header onBack={() => navigation.goBack()} />
      
      {/* 2. ADIM: İçeriği sarmalayan ana gövde kutusu. */}
      <View style={styles.container}>
        
        {/* Sayfa başlıkları */}
        <Text style={styles.title}>Doğrulama</Text>
        <Text style={styles.subtitle}>Devam etmek için kodu girin.</Text>
        
        {/* Görsel bütünlüğü sağlayan emojili illüstrasyon alanı */}
        <View style={styles.illus}>
          <Text style={styles.illusEmoji}>✉️</Text>
        </View>
        
        {/* Bir önceki ekrandan taşınan e-posta bilgisinin kullanıcıya gösterildiği alan */}
        <Text style={styles.sentTo}>Kodu şu adrese gönderdik:{'\n'}<Text style={styles.email}>{email}</Text></Text>
        
        {/* 3. ADIM: 4 Haneli OTP Girdi Kutularının Yan Yana Dizildiği Satır.
            - .map fonksiyonu kullanılarak tek tek kod yazmak yerine 4 adet kutu döngüyle otomatik oluşturulur.
            - ref: Her kutunun kimliği refs dizisine kaydedilir, böylece handleChange fonksiyonu sonraki kutuyu bulabilir.
            - maxLength={1}: Her kutuya sadece tek bir karakter girilebilmesini garantiler.
            - keyboardType="number-pad": Kullanıcının karşısına sadece sayı klavyesi çıkartır. */}
        <View style={styles.otpRow}>
          {otp.map((d, i) => (
            <TextInput
              key={i}
              ref={r => (refs.current[i] = r)}
              style={[styles.otpInput, d ? styles.otpFilled : null]} // Kutu doluysa kenarlıkları vurgulayan stil eklenir
              value={d}
              onChangeText={t => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        
        {/* Yeniden kod talep etme linki */}
        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Kodu alamadın mı? <Text style={styles.resendBold}>Tekrar Gönder</Text></Text>
        </TouchableOpacity>
        
        {/* 4. ADIM: Devam Et Butonu. Basıldığında şifre yenileme zincirinin son halkası olan 'NewPassword' (Yeni Şifre) ekranına geçiş sağlanır. */}
        <CustomButton title="Devam Et" onPress={() => navigation.navigate('NewPassword')} style={{ marginBottom: 20 }} />
        
        {/* Süreci tamamen iptal edip giriş ekranına dönmek isteyenler için yerleştirilen yazı linki */}
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>← Giriş Ekranına Dön</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Arka plan rengini projenin genel temasına eşitler.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Belirlenen tasarım standardı doğrultusunda sağ-sol iç boşluğu tam 32px olarak güncellendi.
  container: { flex: 1, paddingHorizontal: 32, paddingTop: 10 },
  
  // Başlık yazı stilleri
  title: { fontSize: 30, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  subtitle: { fontSize: 17.5, color: colors.textSecondary, marginBottom: 25 },
  
  // Emojili kutunun görsel yerleşim ayarları
  illus: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lightBlue, borderRadius: 20, paddingVertical: 28, marginBottom: 25 },
  illusEmoji: { fontSize: 64 },
  
  sentTo: { fontSize: 16.5, color: colors.textSecondary, marginBottom: 35, lineHeight: 25, textAlign: 'center' },
  email: { fontWeight: '600', color: colors.primary },
  
  // Yan yana dizilen kutuların satır yerleşimi ve aralarındaki boşluklar (gap: 15)
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, gap: 15 },
  
  // Boş kutunun tasarımı: Esnek genişlik (flex: 1), yüksek boy ve büyük font boyutu uygulandı.
  otpInput: { flex: 1, height: 75, borderRadius: 15, backgroundColor: colors.lightBlue, borderWidth: 1.5, borderColor: colors.border, fontSize: 30, fontWeight: '700', color: colors.textPrimary },
  
  // Kullanıcı kutuya sayı girdiğinde devreye giren doluluk stili (Arka plan beyaz olur ve kenarlıklar belirginleşir)
  otpFilled: { borderColor: colors.primary, backgroundColor: colors.white },
  
  resend: { alignItems: 'center', marginBottom: 30 },
  resendText: { fontSize: 16.5, color: colors.textSecondary },
  resendBold: { color: colors.primary, fontWeight: '700' },
  backText: { fontSize: 16.5, color: colors.primary, fontWeight: '600' },
}); 