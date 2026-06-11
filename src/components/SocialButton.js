import React from 'react';
// Tıklanabilir buton alanı (TouchableOpacity), metin yazıları (Text), stil yönetimi (StyleSheet) ve kutulama (View) dahil edildi.
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
// Ortak tema renk dosyası.
import { colors } from '../theme/colors';

// --- SOSYAL MEDYA BUTON YAPILANDIRMASI (CONFIG) ---
// Her bir platformun (Google, Apple, Facebook) kendine has ikon harfi, arka plan rengi ve yazı rengi burada tanımlanmıştır.
const CFG = {
  google:   { icon: 'G', bg: '#FFF',     text: '#333' },
  apple:    { icon: '',  bg: '#000',     text: '#FFF' }, // Apple logosu sistem fontu veya özel ikonla basılacağı için harf alanı boş bırakılmıştır.
  facebook: { icon: 'f', bg: '#1877F2', text: '#FFF' },
};

// Dışarıdan parametre alabilen esnek sosyal medya butonu fonksiyonu.
// - provider: Butonun hangi platforma ait olacağını belirler (Varsayılan olarak 'google' gelir).
// - label: Butonun üzerinde yazacak olan metin (örn: "Google ile devam et").
// - onPress: Butona tıklandığında çalışacak olan fonksiyon.
export default function SocialButton({ provider = 'google', onPress, label }) {
  
  // Dışarıdan gelen 'provider' kelimesine göre (google, apple veya facebook) ilgili renk ve ikon şeması CFG nesnesinden tek seferde çekilir.
  const { icon, bg, text } = CFG[provider];

  return (
    <TouchableOpacity
      // Butonun arka plan rengi dinamik olarak yukarından gelen 'bg' değeri ile boyanır.
      style={[styles.button, { backgroundColor: bg }]}
      onPress={onPress}
      activeOpacity={0.8} // Tıklama anındaki şeffaflık geçiş oranı.
    >
      {/* İkon ve metni yan yana (flexDirection: 'row') ve aralarında boşluk olacak şekilde dizen iç katman */}
      <View style={styles.inner}>
        {/* Platforma ait harf veya sembol ikonu */}
        <Text style={[styles.icon, { color: text }]}>{icon}</Text>
        
        {/* Dışarıdan gönderilen buton etiketi */}
        <Text style={[styles.label, { color: text }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

// --- BİLEŞENİN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Butonun genel iskeleti: 60 birim yükseklik, yuvarlatılmış köşeler ve ekranın tamamını kaplama (width: '100%') ayarı.
  button: {
    height: 60, borderRadius: 12.5, width: '100%',
    marginBottom: 12.5, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', paddingHorizontal: 20,
  },
  
  // İçerideki elemanları yan yana dizen ve aralarına 12.5 birim boşluk (gap) bırakan satır stili.
  inner: { flexDirection: 'row', alignItems: 'center', gap: 12.5 },
  
  // İkon harfinin boyutu, kalınlığı ve butonlar arasında kayma yapmaması için sabitlenmiş genişliği (width: 25).
  icon: { fontSize: 20, fontWeight: '700', width: 25, textAlign: 'center' },
  
  // Buton metninin font boyutu ve kalınlık ayarı.
  label: { fontSize: 17.5, fontWeight: '500' },
});