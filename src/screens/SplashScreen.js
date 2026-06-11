import React from 'react';
// Telefon ekranında kutular oluşturmak (View), yazılar yazmak (Text), 
// stiller tasarlamak (StyleSheet) ve fotoğraflar göstermek (Image) için gerekli temel malzemeleri alıyoruz.
import { View, Text, StyleSheet, Image } from 'react-native';

// Yeni nesil telefonların üst kısmındaki kamera çentiği (notch) veya şarj göstergesi gibi alanların
// altına yazılarımızın ve logomuzun girmesini engelleyen, içeriği "güvenli bölgeye" alan koruyucu katman.
import { SafeAreaView } from 'react-native-safe-area-context';

// Kendi tasarladığımız, uygulamanın her yerinde ortak kullanacağımız özel butonumuzu çağırıyoruz.
import CustomButton from '../components/CustomButton';

// Uygulamanın renk paletini (mavi, beyaz vb.) tek bir merkezden yönettiğimiz renk dosyamız.
import { colors } from '../theme/colors';

// 'navigation' kelimesi, bu ekranın diğer ekranlara geçiş yapabilmesini sağlayan bir yönlendiricidir (kumandadır).
export default function SplashScreen({ navigation }) {
  return (
    // 1. ADIM: Ekranın en dış çerçevesi. Kameranın altına girmeyi engeller ve arka plan rengini ayarlar.
    <SafeAreaView style={styles.safe}>
      
      {/* 2. ADIM: İçindeki tüm ögeleri (logo, buton, yazılar) sağdan soldan koruyan ana kutu. */}
      <View style={styles.container}>
        
        {/* 3. ADIM: Logo ve yazıların ekranın tam ortasında, alt alta düzgünce durmasını sağlayan orta bölge. */}
        <View style={styles.logoArea}>
          
          {/* Logonun arkasındaki renkli yuvarlak daire katmanı */}
          <View style={styles.logoCircle}>
            {/* Bilgisayarımızdaki 'akreplogo.png' resmini bu dairenin tam içine yerleştiriyoruz */}
            <Image
              source={require('../assets/images/akreplogo.png')}
              style={styles.logoImg}
              resizeMode="contain" // Resim yamulmasın, yuvarlağın içine sığacak şekilde kendini ayarlasın.
            />
          </View>
          
          {/* Uygulamanın büyük adı, dikkat çekici ana sloganı ve altındaki açıklama yazısı */}
          <Text style={styles.brandName}>SCORPIA</Text>
          <Text style={styles.tagline}>Sanal paranın gerçek yüzünü keşfet</Text>
          <Text style={styles.subtitle}>Harcamalarınızı kolayca takip edin ve finansal hedeflerinize ulaşın.</Text>
        </View>
        
        {/* 4. ADIM: En altta duran "BAŞLA" butonu. 
            onPress (yani basıldığında) yönlendirici kumandamıza 'Welcome' (Karşılama) ekranına git emrini verir. */}
        <CustomButton title="BAŞLA" onPress={() => navigation.navigate('Welcome')} />
        
      </View>
    </SafeAreaView>
  );
}

// --- EKRANIN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Ekranın tamamını kapla ve rengini ortak renk dosyamızdaki arka plan rengi yap.
  safe: { flex: 1, backgroundColor: colors.background },
  
  // paddingHorizontal (sağ-sol boşluk) ve paddingTop (üst boşluk) değerlerini ekibin kararına göre tam 32 yaptık
  container: { flex: 1, paddingHorizontal: 32, justifyContent: 'space-between', paddingBottom: 50, paddingTop: 32 },
  
  // Ortadaki logo ve yazıları dikeyde ve yatayda tam merkeze hizala.
  logoArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  
  // Logonun arkasındaki daire: Eni ve boyu 175 birim, köşelerinin yuvarlaklığı (radius) tam yarısı. 
  // Böylece kusursuz bir yuvarlak elde ediyoruz. Altına da 30 birim boşluk bırakıyoruz.
  logoCircle: { width: 175, height: 175, borderRadius: 87.5, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  
  // Logo resminin boyutları.
  logoImg: { width: 137.5, height: 137.5 },
  
  // Marka yazısının stili: Boyutu büyük (35), çok kalın (800) ve harflerin arası açık (letterSpacing).
  brandName: { fontSize: 35, fontWeight: '800', color: colors.primary, letterSpacing: 4, marginBottom: 12.5 },
  
  // Slogan yazısının stili: Orta büyüklükte, yarı kalın ve ortalanmış yazı.
  tagline: { fontSize: 19, fontWeight: '600', color: colors.textSecondary, marginBottom: 10, textAlign: 'center' },
  
  // En alttaki uzun açıklama metni: Okunması rahat olsun diye satır aralarını açtık (lineHeight: 25).
  subtitle: { fontSize: 16.5, color: colors.textLight, textAlign: 'center', lineHeight: 25, paddingHorizontal: 12.5 },
});