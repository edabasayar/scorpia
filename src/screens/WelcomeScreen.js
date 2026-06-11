import React from 'react';
// Telefon ekranında kutular oluşturmak (View), yazılar yazmak (Text), 
// tasarımları şekillendirmek (StyleSheet) ve logolar göstermek (Image) için temel parçaları çağırıyoruz.
import { View, Text, StyleSheet, Image } from 'react-native';

// Telefonun üst barındaki şarj, saat gibi göstergelerin altına yazıların kaymasını önleyen,
// içeriği güvenli bölgede tutan koruyucu dış katman.
import { SafeAreaView } from 'react-native-safe-area-context';

// Projede sürekli kullandığımız ortak buton bileşenimiz.
import CustomButton from '../components/CustomButton';

// Uygulamanın renk paletini tek bir merkezden yönettiğimiz dosyamız.
import { colors } from '../theme/colors';

// 'navigation', butonlara basıldığında başka bir ekrana geçmemizi sağlayan yönlendirici kumanda.
export default function WelcomeScreen({ navigation }) {
  return (
    // 1. ADIM: Ekranın en dış çerçevesi. Kameranın altına girmeyi engeller ve arka plan rengini ayarlar.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: İçindeki tüm ögeleri (yazılar, logo, butonlar) saran ve boşlukları ayarlayan ana kutu. */}
      <View style={styles.container}>
        
        {/* 3. ADIM: Ekranın en üstünde duran "Hoş Geldin" başlığı ve altındaki yönlendirme yazısı. */}
        <View style={styles.titleArea}>
          <Text style={styles.welcomeTitle}>Hoş Geldin</Text>
          <Text style={styles.welcomeSub}>Devam etmek için bir seçenek belirle.</Text>
        </View>
        
        {/* 4. ADIM: Ekranın tam ortasında duran yuvarlak logo, marka adı ve slogan alanı. */}
        <View style={styles.logoArea}>
          {/* Logonun arkasındaki renkli yuvarlak daire katmanı */}
          <View style={styles.logoCircle}>
            {/* Proje klasöründeki 'akreplogo.png' resmini bu dairenin tam içine yerleştiriyoruz */}
            <Image
              source={require('../assets/images/akreplogo.png')}
              style={styles.logoImg}
              resizeMode="contain" // Resim yamulmasın, yuvarlağın içine sığacak şekilde kendini ayarlasın.
            />
          </View>
          {/* Marka adı ve slogan yazıları */}
          <Text style={styles.brandName}>SCORPIA</Text>
          <Text style={styles.tagline}>Sanal paranın gerçek yüzünü keşfet</Text>
        </View>
        
        {/* 5. ADIM: Ekranın en altında duran butonlar bölgesi. Kullanıcıya iki seçenek sunuyoruz. */}
        <View style={styles.buttonArea}>
          {/* Birinci Buton: Basıldığında yönlendirici kumandamıza 'Register' (Kayıt) ekranına git emrini verir. */}
          <CustomButton title="Yeni Hesap Oluştur" onPress={() => navigation.navigate('Register')} />
          
          {/* İki buton birbirine yapışmasın diye araya 15 birimlik görünmez bir boşluk kutusu koyuyoruz. */}
          <View style={{ height: 15 }} />
          
          {/* İkinci Buton: variant="outline" diyerek bu butonun arkasını şeffaf, sadece çerçeveli yapıyoruz. 
              Basıldığında yönlendirici kumandamıza 'Login' (Giriş) ekranına git emrini verir. */}
          <CustomButton title="Zaten hesabım var" variant="outline" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Ekranın tamamını kapla ve rengini ortak renk dosyamızdaki arka plan rengi yap.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // paddingHorizontal (sağ-sol boşluk) ve paddingTop (üst boşluk) değerlerini ekibin kararına göre tam 32 yaptık:
  container: { flex: 1, paddingHorizontal: 32, paddingBottom: 50, paddingTop: 32, justifyContent: 'space-between' },
  
  // Ortadaki logo ve yazıları kendi alanında dikeyde ve yatayda tam merkeze hizala.
  logoArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  
  // Logonun arkasındaki daire: Eni ve boyu 137.5 birim, köşelerinin yuvarlaklığı (radius) tam yarısı (69).
  logoCircle: { width: 137.5, height: 137.5, borderRadius: 69, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  
  // Logo resminin boyutları.
  logoImg: { width: 106.5, height: 106.5 },
  
  // Marka yazısının stili: Boyutu 30, çok kalın (800) ve harflerin arası açık (letterSpacing).
  brandName: { fontSize: 30, fontWeight: '800', color: colors.primary, letterSpacing: 4, marginBottom: 10 },
  
  // Slogan yazısının stili: Orta büyüklükte, yarı kalın ve renk dosyasındaki ikincil metin renginde.
  tagline: { fontSize: 16.5, fontWeight: '600', color: colors.textSecondary },
  
  // En üstteki "Hoş Geldin" başlığının dış kutusu, altına biraz boşluk bırakır.
  titleArea: { marginBottom: 25 },
  
  // Büyük "Hoş Geldin" yazısının kalınlık ve boyut ayarı.
  welcomeTitle: { fontSize: 27.5, fontWeight: '700', color: colors.textPrimary, marginBottom: 5 },
  
  // "Bir seçenek belirle" alt yazısının stili.
  welcomeSub: { fontSize: 16.5, color: colors.textSecondary },
  
  // Butonların içinde durduğu kutu, butonların ekranın solundan sağına tam genişlikte (100%) yayılmasını sağlar.
  buttonArea: { width: '100%' },
});