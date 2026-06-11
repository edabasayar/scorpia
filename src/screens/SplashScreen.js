import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/images/akreplogo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandName}>SCORPIA</Text>
          <Text style={styles.tagline}>Sanal paranın gerçek yüzünü keşfet</Text>
          <Text style={styles.subtitle}>Harcamalarınızı kolayca takip edin ve finansal hedeflerinize ulaşın.</Text>
        </View>
        <CustomButton title="BAŞLA" onPress={() => navigation.navigate('Welcome')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 35, justifyContent: 'space-between', paddingBottom: 50, paddingTop: 25 },
  logoArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoCircle: { width: 175, height: 175, borderRadius: 87.5, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  logoImg: { width: 137.5, height: 137.5 },
  brandName: { fontSize: 35, fontWeight: '800', color: colors.primary, letterSpacing: 4, marginBottom: 12.5 },
  tagline: { fontSize: 19, fontWeight: '600', color: colors.textSecondary, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16.5, color: colors.textLight, textAlign: 'center', lineHeight: 25, paddingHorizontal: 12.5 },
});