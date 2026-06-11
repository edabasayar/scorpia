import React, { useState } from 'react';
// Kutular (View), veri giriş alanı (TextInput), yazılar (Text), tıklanabilir alanlar (TouchableOpacity) ve stil yönetimi (StyleSheet) dahil edildi.
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Ortak tema renk dosyası.
import { colors } from '../theme/colors';

// Dışarıdan parametre alabilen esnek veri giriş kutusu fonksiyonu.
// - label: Kutunun üstünde görünecek olan başlık (örn: "E-Posta Adresi").
// - placeholder: Kutunun içi boşken görünecek olan ipucu yazısı.
// - secureTextEntry: Şifre alanlarında karakterleri gizlemek için kullanılan özellik (Varsayılan 'false').
// - keyboardType: Klavyenin türünü belirler (Varsayılan 'default').
// - autoCapitalize: İlk harflerin otomatik büyük harf olup olmayacağını belirler (Varsayılan 'none').
export default function CustomInput({
  label, placeholder, value, onChangeText,
  secureTextEntry = false, keyboardType = 'default',
  autoCapitalize = 'none', style,
}) {
  // Şifre alanlarında göz ikonuna basıldığında şifrenin görünürlük durumunu (açık/kapalı) tutan hafıza kutusu.
  const [visible, setVisible] = useState(false);

  return (
    // Dışarıdan gelebilecek ekstra stil ayarlarıyla temel konteyner stilini birleştirir.
    <View style={[styles.container, style]}>
      {/* ŞARTLI GÖSTERİM: Eğer dışarıdan bir label (başlık text'i) gönderilmişse ekrana basılır, gönderilmemişse null dönerek alan kaplamaz. */}
      {label ? <Text style={styles.label}>{label}</Text> : null}
      
      {/* TextInput ile şifre göz ikonunu yan yana (flexDirection: 'row') dizen iç sarmalayıcı alan */}
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          // Karakter gizleme mantığı: Eğer dışarıdan şifre alanı olduğu belirtilmişse (secureTextEntry: true) 
          // VE göz ikonuna basılıp görünür kılınmamışsa (!visible) karakterleri gizler.
          secureTextEntry={secureTextEntry && !visible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        
        {/* ŞARTLI GÖSTERİM: Sadece şifre alanlarında (secureTextEntry true olduğunda) sağ taraftaki göz butonunu devreye sokar. */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eye}>
            <View style={styles.eyeIcon}>
              {/* visible durumuna göre gözün açık veya kapalı görünmesini sağlayan CSS çizim katmanları */}
              <View style={[styles.eyeOuter, visible && styles.eyeOuterOpen]} />
              {!visible && <View style={styles.eyeLine} />}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// --- BİLEŞENİN GÖRSEL TASARIM AYARLARI (MAKYAJ KISMI) ---
const styles = StyleSheet.create({
  // Giriş kutularının alt alta dizilirken aralarında bıraktığı dikey boşluk
  container: { marginBottom: 17.5, width: '100%' },
  
  // Kutunun üstünde yer alan etiket yazısının boyut ve kalınlık ayarı
  label: { fontSize: 16.5, fontWeight: '600', color: colors.textPrimary, marginBottom: 7.5 },
  
  // Girdi alanının dış çerçevesi: İçindekileri yan yana dizer, arka planı açık bir renkle doldurur ve köşeleri yumuşatır
  wrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.accent, borderRadius: 12.5,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 17.5, height: 60,
  },
  
  // Yazı yazılan alanın ekranın kalan tüm genişliğini kaplamasını sağlayan (flex: 1) ayar
  input: { flex: 1, fontSize: 17.5, color: colors.textPrimary },
  
  // Şifre göz butonunun tıklama alanını genişletmek için verilen iç boşluk (padding)
  eye: { padding: 7.5 },
  eyeIcon: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center' },
  
  // CSS ile oluşturulan göz şeklinin oval dış halkası
  eyeOuter: {
    width: 22.5, height: 15, borderRadius: 11.5,
    borderWidth: 2, borderColor: colors.secondary,
  },
  
  // Şifre görünür olduğunda göz halkasının rengini birincil temaya çevirir
  eyeOuterOpen: { borderColor: colors.primary },
  
  // Şifre gizliyken gözün üzerine çekilen eğik çizgiyi (rotate: '45deg') temsil eden katman
  eyeLine: {
    position: 'absolute', width: 25, height: 2.5,
    backgroundColor: colors.secondary,
    transform: [{ rotate: '45deg' }],
  },
});