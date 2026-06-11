import React from 'react';
// Kutular (View), tıklanabilir alanlar (TouchableOpacity), yazılar (Text), stil yönetimi (StyleSheet) ve resimler (Image) dahil edildi.
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
// Ortak tema renk dosyası.
import { colors } from '../theme/colors';

// Dışarıdan parametre alabilen esnek üst bar fonksiyonu.
// - onBack: Bir önceki ekrana dönmeyi tetikleyen fonksiyon parametresi.
export default function Header({ onBack }) {
  return (
    // Üst barın ana satır çerçevesi. İçindeki elemanları yan yana dizer (row) ve eşit aralıklarla dağıtır.
    <View style={styles.container}>
      
      {/* ŞARTLI GÖSTERİM (TERNARY OPERATOR):
          Eğer bu bileşene dışarıdan 'onBack' fonksiyonu gönderildiyse tıklanabilir geri ok butonunu basar.
          Eğer gönderilmediyse, ortadaki logonun sağa kaymasını önlemek için sol tarafa boş bir yer tutucu (ph) yerleştirir. */}
      {onBack
        ? <TouchableOpacity onPress={onBack} style={styles.back}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        : <View style={styles.ph} />
      }
      
      {/* Ortada konumlanan ve projenin logosunu barındıran yuvarlak logo alanı */}
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/akreplogo.png')}
          style={styles.logoImg}
          resizeMode="contain" // Logonun bozulmadan kutunun içine sığmasını sağlar.
        />
      </View>
      
      {/* SAĞ TARAF YER TUTUCU (PLACEHOLDER):
          Sol taraftaki butonun genişliğiyle (45 birim) birebir aynı olan boş bir kutudur.
          Bu kutunun amacı, ortadaki logonun ekranın tam matematiksel merkezinde kalmasını sağlamaktır. */}
      <View style={styles.ph} />
    </View>
  );
}

// --- BİLEŞENİN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Üst barın genel satır yerleşimi, iç boşlukları ve elemanları köşelere yaslama ayarı
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  
  // Sol taraftaki geri butonunun kare kutu tasarımı, açık mavi arka planı ve yuvarlatılmış köşeleri
  back: { width: 45, height: 45, borderRadius: 10, backgroundColor: colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  
  // Geri butonunun içindeki "‹" işaretinin boyut, renk ve dikeyde tam ortalanması için satır yüksekliği ayarı
  backIcon: { fontSize: 30, color: colors.primary, fontWeight: '300', lineHeight: 35 },
  
  // Ortadaki logonun dış yuvarlak çerçevesi (Genişlik ve yükseklik 50, borderRadius tam yarısı olan 25)
  logo: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  
  // Logo resminin boyut ayarı
  logoImg: { width: 40, height: 40 },
  
  // Dengeli hizalama yapabilmek için kullanılan 45 birim genişliğindeki boş yer tutucu kutu stili
  ph: { width: 45 },
});