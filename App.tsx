// React kütüphanesini ve temel bileşenleri projemize dahil ediyoruz.
import React from 'react';

// Uygulama içindeki tüm ekran geçişlerini ve navigasyon ağacını sarmalayan ana konteyner bileşeni.
import { NavigationContainer } from '@react-navigation/native';

// Ekranların üst üste yığılarak (kartlar gibi) açılmasını sağlayan Stack Navigasyon yapısını çağırıyoruz.
import { createStackNavigator } from '@react-navigation/stack';

// Kaydırma hareketlerinin (swipe, kaydırma vb.) performanslı çalışmasını sağlayan kök bileşen.
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// CSS benzeri yapılandırma ile bileşenlerimize stil/tasarım vermemizi sağlayan araç.
import { StyleSheet } from 'react-native';

// --- GLOBAL STATE / DURUM YÖNETİMİ ---
// Giriş yapan kullanıcının verilerini tüm ekranlarda paylaşabilmek için Context yapısını içeri aktarıyoruz.
import { UserProvider } from './src/context/UserContext';

// --- EKRANLARIN (SCREENS) İÇERİ AKTARILMASI ---
import SplashScreen from './src/screens/SplashScreen'; // Açılış (Logo) Ekranı
import WelcomeScreen from './src/screens/WelcomeScreen'; // Karşılama Ekranı
import LoginScreen from './src/screens/LoginScreen'; // Giriş Yapma Ekranı
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'; // Şifremi Unuttum Ekranı
import OTPScreen from './src/screens/OTPScreen'; // Tek Kullanımlık Kod (Doğrulama) Ekranı
import NewPasswordScreen from './src/screens/NewPasswordScreen'; // Yeni Şifre Oluşturma Ekranı
import PasswordChangedScreen from './src/screens/PasswordChangedScreen'; // Şifre Değiştirildi Onay Ekranı
import RegisterScreen from './src/screens/RegisterScreen'; // Yeni Kayıt Ekranı
import AccountCreatedScreen from './src/screens/AccountCreatedScreen'; // Hesap Oluşturuldu Onay Ekranı
import ProfileScreen from './src/screens/ProfileScreen'; // Kullanıcı Profil Ekranı

// Uygulama içi ekran yığınını (Stack) yöneteceğimiz nesneyi oluşturuyoruz.
const Stack = createStackNavigator();

export default function App() {
  return (
    // 1. ADIM: Tüm uygulamayı GestureHandler ile sararak gelişmiş kaydırma hareketlerini aktif ediyoruz.
    <GestureHandlerRootView style={styles.root}>
      
      {/* 2. ADIM: Kullanıcı bilgilerini (oturum durumunu) altındaki tüm ekranların erişebileceği hale getiriyoruz. */}
      <UserProvider>
        
        {/* 3. ADIM: Navigasyon yapısının cihaz genelinde düzgün çalışması için ana sarmalayıcıyı koyuyoruz. */}
        <NavigationContainer>
          
          {/* 4. ADIM: Ekran geçiş ayarlarını yapılandırıyoruz.
              - initialRouteName="Splash": Uygulama ilk açıldığında doğrudan 'Splash' ekranı yüklenecek.
              - headerShown: false: React Navigation'ın kendi otomatik üst başlık barını gizliyoruz (Kendi tasarımımızı kullanacağız).
              - cardStyle: Tüm uygulama sayfalarının arka plan rengini standart bir açık mavi (#F0F4FF) yapıyoruz. */}
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#F0F4FF' },
            }}
          >
            {/* 5. ADIM: Navigasyon sistemine projemizdeki tüm ekranları isimleriyle kaydediyoruz.
                Böylece ekranlar içinde "navigation.navigate('Login')" diyerek bu sayfalara geçiş yapabileceğiz. */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
          
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

// Tasarım stillerinin tanımlandığı alan
const styles = StyleSheet.create({
  // flex: 1 diyerek GestureHandler bileşeninin tüm cihaz ekranını tamamen kaplamasını sağlıyoruz.
  root: { flex: 1 },
});