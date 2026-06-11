import React from 'react';
// Ekranda kutular oluşturmak (View), yazılar yazmak (Text) ve bunlara stil uygulamak (StyleSheet) için gerekli temel malzemeler dahil edildi.
import { View, Text, StyleSheet } from 'react-native';

// Yeni nesil telefonlardaki ekran çentiklerinin altına içeriğin kaymasını önlemek için kullanılan güvenli alan sarmalayıcı bileşen.
import { SafeAreaView } from 'react-native-safe-area-context';

// Sayfanın en üstünde duran, geri dönmeyi sağlayan ortak başlık çubuğu bileşeni.
import Header from '../components/Header';

// Uygulama genelinde standart olarak kullanılan özel tasarım buton bileşeni.
import CustomButton from '../components/CustomButton';

// Renklerin tek bir merkezden yönetilmesini sağlayan ortak tema renk dosyası.
import { colors } from '../theme/colors';

// 'navigation' parametresi, butonlara basıldığında ekranlar arası geçişi sağlayan yönlendirici yapıdır.
export default function AccountCreatedScreen({ navigation }) {
  return (
    // 1. ADIM: Ekranın en dış çerçevesi. Telefonun durum çubuğunu korur ve arka plan rengini belirler.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: En üstteki geri butonu barı. 
          Kullanıcı buraya kayıt sayfasından geldiği için, geri basıldığında tekrar 'Register' (Kayıt) ekranına yönlendirme yapılır. */}
      <Header onBack={() => navigation.navigate('Register')} />
      
      {/* 3. ADIM: Tüm tebrik içeriğini ekranın tam ortasında toplayan ana gövde kutusu. */}
      <View style={styles.container}>
        
        {/* Başarıyı temsil eden büyük onay işaretli yuvarlak daire katmanı */}
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>
        
        {/* Kullanıcıyı karşılayan ana tebrik başlığı ve altındaki bilgilendirme yazısı */}
        <Text style={styles.title}>Hesap Oluşturuldu!</Text>
        <Text style={styles.subtitle}>Hesabınız başarıyla oluşturuldu.</Text>
        
        {/* 4. ADIM: Kullanıcıyı uygulamanın içine, yani ana profil sayfasına taşıyacak olan "Devam Et" butonu.
            onPress (basıldığında) mekanizması ile 'Profile' (Profil) ekranına geçiş tetiklenir. */}
        <CustomButton title="Devam Et" onPress={() => navigation.navigate('Profile')} style={{ width: '100%' }} />
        
      </View>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Ekranın tamamını kaplatıp, rengini projenin genel arka plan rengiyle eşitler.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // Belirlenen tasarım standardı doğrultusunda sağ-sol iç boşluğu tam 32px olarak ayarlandı.
  // İçindeki tüm elemanların dikeyde ve yatayda tam ortada durması sağlandı.
  container: { flex: 1, paddingHorizontal: 32, alignItems: 'center', justifyContent: 'center', paddingBottom: 75 },
  
  // Ortadaki büyük onay dairesi: Eni ve boyu 175 birim, yuvarlak olması için köşe yumuşatma (borderRadius) değeri tam yarısı olarak verildi.
  circle: { width: 175, height: 175, borderRadius: 87.5, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  
  // Dairenin içindeki beyaz tik işaretinin boyut ve renk ayarı.
  check: { fontSize: 75, color: colors.white },
  
  // "Hesap Oluşturuldu!" başlığının kalınlık ve boyut ayarı.
  title: { fontSize: 32.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 12.5 },
  
  // Alt açıklama yazısının rengi ve butondan ne kadar uzakta duracağını belirleyen alt boşluk ayarı.
  subtitle: { fontSize: 17.5, color: colors.textSecondary, textAlign: 'center', marginBottom: 50 },
});