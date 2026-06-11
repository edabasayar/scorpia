import React, { createContext, useContext, useState } from 'react';

// --- CONTEXT (BAĞLAM) OLUŞTURMA ---
// Tüm uygulamada ortaklaşa kullanılacak olan veri havuzunu (UserContext) oluşturuyoruz.
// Başlangıç değerini 'null' (boş) olarak belirliyoruz.
// Bu havuz, ProfileScreen gibi ekranlar kapansa bile kullanıcının oturum bilgisini hafızada korur.
const UserContext = createContext(null);

// --- PROVIDER (SAĞLAYICI) BİLEŞENİ ---
// Bu bileşen, App.tsx içinde diğer tüm ekranları sarmalayan yapıdır.
// İçine aldığı 'children' (alt bileşenler/ekranlar) sayesinde veriyi tüm uygulamaya dağıtır.
export function UserProvider({ children }) {
  
  // 'username' adında bir state (durum değişkeni) tanımlıyoruz.
  // Uygulama ilk açıldığında test veya varsayılan değer olarak 'eda123' atıyoruz.
  // 'setUsername' fonksiyonu ise bu kullanıcı adını ileride (Giriş yapıldığında vs.) değiştirmemizi sağlar.
  const [username, setUsername] = useState('eda123');

  return (
    // Havuzun (Context) sağlayıcı özelliğini kullanarak, altındaki tüm bileşenlere
    // hem kullanıcı adını (username) hem de bu adı değiştirecek fonksiyonu (setUsername) servis ediyoruz.
    <UserContext.Provider value={{ username, setUsername }}>
      {children} {/* Sarmalanan tüm ekranlar bu veriye erişebilir hale gelir */}
    </UserContext.Provider>
  );
}

// --- CUSTOM HOOK (ÖZEL KULLANIM FONKSİYONU) ---
// Ekranların içinden bu kullanıcı verisine çok daha kolay ve tek satırda erişebilmesi için
// 'useUser' adında özel bir fonksiyon (hook) tanımlıyoruz.
export function useUser() {
  // Context havuzundaki güncel verileri çekiyoruz.
  const ctx = useContext(UserContext);
  
  // Eğer bu fonksiyon, App.tsx'teki <UserProvider> sarmalının DIŞINDA bir yerde çağrılırsa
  // uygulamanın çökmesini engellemek ve hatayı geliştiriciye bildirmek için güvenli bir kontrol yapıyoruz.
  if (!ctx) {
    throw new Error('useUser, UserProvider içinde kullanılmalı');
  }
  
  // Eğer her şey yolundaysa, aktif kullanıcı verilerini ekranın kullanması için geri döndürüyoruz.
  return ctx;
} 