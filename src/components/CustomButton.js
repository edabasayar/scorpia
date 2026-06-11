import React from 'react';
// Tıklanabilir buton alanı (TouchableOpacity), metin yazısı (Text), stil yönetimi (StyleSheet)
// ve yükleme esnasında dönen animasyonlu ikon (ActivityIndicator) dahil edildi.
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
// Ortak tema renk dosyası.
import { colors } from '../theme/colors';

// Dışarıdan parametre alabilen esnek buton fonksiyonu.
// - title: Butonun üstünde yazacak metin.
// - variant: Butonun tarzı (Varsayılan olarak arkası dolu 'primary' gelir).
// - loading: İşlem yapılıyorken dönen ikonun çıkıp çıkmayacağını belirler (Varsayılan 'false').
// - style ve textStyle: Butona çağrıldığı ekrandan özel ekstra boyut/renk stilleri verebilmeyi sağlar.
export default function CustomButton({
  title, onPress, variant = 'primary', loading = false, style, textStyle,
}) {
  // Gelen 'variant' değerine göre butonun hangi görsel tarzı alacağını kontrol eden mantıksal değişkenler.
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      // Mevcut temel buton stili ile variant'tan gelen (primary ya da outline) stilleri ve dışarıdan eklenen özel stilleri birleştirir.
      style={[styles.button, isPrimary && styles.primary, isOutline && styles.outline, style]}
      onPress={onPress}
      activeOpacity={0.8} // Butona basıldığında oluşacak hafif şeffaflık oranı.
      disabled={loading}   // Eğer yüklenme durumu (loading) aktifse, butona tekrar basılmasını engeller.
    >
      {/* ŞARTLI GÖSTERİM (TERNARY OPERATOR):
          Eğer loading durumu 'true' ise ekranda dönen yükleme simgesi gösterilir, 
          'false' ise butonun başlığı (title) yazdırılır. */}
      {loading
        ? <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
        : <Text style={[styles.text, isPrimary && styles.textPrimary, isOutline && styles.textOutline, textStyle]}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
}

// --- BİLEŞENİN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Tüm butonlarda ortak olan temel iskelet: 65 birim yükseklik, hafif yuvarlatılmış köşeler ve metni tam ortalama ayarı.
  button: { height: 65, borderRadius: 12.5, alignItems: 'center', justifyContent: 'center', width: '100%' },
  
  // Birincil buton tarzı: Arkası temanın ana rengiyle doludur.
  primary: { backgroundColor: colors.primary },
  
  // Çerçeveli buton tarzı: Arka plan şeffaf, kenarlar ince çizgili ve belirgindir.
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  
  // Yazıların ortak temel boyutu ve kalınlığı.
  text: { fontSize: 20, fontWeight: '600' },
  
  // Birincil butonun içindeki yazıyı beyaz yapar.
  textPrimary: { color: colors.white },
  
  // Çerçeveli butonun içindeki yazıyı temanın ana rengiyle boyar.
  textOutline: { color: colors.primary },
});